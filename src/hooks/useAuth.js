import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axios';
import useSWR from 'swr';
import { useEffect } from 'react';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export const useAuth = ({ middleware, url }) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    const fetcher = async () => {
        try {
            const response = await axiosClient('api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            // Si hay un error 401 (No autorizado) en la llamada a 'api/user',
            // no lo reintentamos. El useEffect se encargará de la redirección.
            if (error.response?.status === 401) {
                // Opcional: podrías limpiar el token aquí si quieres forzar un logout inmediato
                // en caso de un token inválido, pero el useEffect ya maneja el !token.
                throw new Error('Unauthorized'); // Lanza un error específico para que SWR lo capture
            }
            const errorMessage = error.response?.data.message || 'Error al obtener datos del usuario';
            throw new Error(errorMessage);
        }
    };

    const { data: user, error, mutate } = useSWR(token ? 'api/user' : null, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // No reintentar en caso de error 401 (Unauthorized)
            if (error.message.includes('Unauthorized')) return;
            // Limitar los reintentos
            if (retryCount >= 3) return;
            // Reintentar después de 5 segundos
            setTimeout(() => revalidate({ retryCount }), 5000);
        }
    });

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await axiosClient.post('/api/register', datos);
            localStorage.setItem(AUTH_TOKEN_KEY, data.data.token);
            setErrores([]); // Limpia errores previos
            await mutate(); // Revalida los datos del usuario
            navigate(url); // Redirige al usuario
        } catch (error) {
            console.error('Error en registro:', error.response?.data);
            if (error.response?.status === 422) {
                // Errores de validación (Laravel, etc.)
                setErrores(error.response.data.errors);
            } else {
                // Otros errores inesperados
                setErrores({
                    general: [error.response?.data.message || 'Error al registrar. Intenta de nuevo.']
                });
            }
        }
    };

    const login = async (datos, setErrores) => {
        try {
            const { data } = await axiosClient.post('/api/login', datos);
            localStorage.setItem(AUTH_TOKEN_KEY, data.data.token);
            setErrores([]); // Limpia errores previos
            await mutate(); // Revalida los datos del usuario
            navigate(url); // Redirige al usuario
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response?.data);
            if (error.response?.status === 422) {
                // Errores de validación
                setErrores(error.response.data.errors);
            } else if (error.response?.status === 401) {
                // Errores de autenticación (credenciales incorrectas)
                setErrores({ general: [error.response.data.message || 'Credenciales incorrectas.'] });
            } else {
                // Otros errores inesperados
                setErrores({
                    general: ['Error al iniciar sesión. Intenta de nuevo.']
                });
            }
        }
    };

    const logout = async () => {
        try {
            // Intenta cerrar sesión en el backend
            await axiosClient.post('api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            // No es crítico si el logout en el backend falla (ej. token ya expirado),
            // lo importante es limpiar el estado del cliente.
            console.error('Error al cerrar sesión en el backend, limpiando cliente de todas formas:', error.response?.data);
        } finally {
            // Siempre limpia el token del localStorage, invalida la caché de SWR y redirige.
            localStorage.removeItem(AUTH_TOKEN_KEY);
            await mutate(undefined, false); // Limpia los datos del usuario en caché de SWR, sin revalidar.
            navigate('/auth/login');
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && user && url) {
            navigate(url);
        }
        // Redirige si el middleware es 'auth' y no hay token o hay un error de autenticación.
        // `user === undefined` ocurre si SWR aún no ha cargado los datos o si la clave es `null`.
        // `error` se seteará si `fetcher` lanza un error (ej. 401).
        if (middleware === 'auth' && (!token || error)) {
            navigate('/auth/login');
        }
    }, [user, error, middleware, url, navigate, token]); // `token` añadido a las dependencias.

    return { registro, login, logout, user, error };
};