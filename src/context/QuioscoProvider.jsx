import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axios';
import { useNavigate } from 'react-router-dom';

const QuioscoContext = createContext();
const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const QuioscoProvider = ({ children }) => {


    //Hooks

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({})
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(newTotal)
    }, [order])


    useEffect(() => {
        getCategories();
    }, []);

    //Funcion Asincrona GET categories
    const getCategories = async () => {
        try {
            const { data } = await axiosClient('api/categories')
            setCategories(data.data);
            setCurrentCategory(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    //Funciones 

    const handleClickCategory = id => {
        const cat = categories.find(cat => cat.id === id)
        setCurrentCategory(cat)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProduct = (product) => {
        setProduct(product)
    }

    const handleAddOrder = ({ category_id, ...product }) => {
        if (order.some(orderState => orderState.id === product.id)) {
            const orderUpdate = order.map(orderState => orderState.id === product.id ? product : orderState)
            setOrder(orderUpdate)
            toast.success("Pedido Actualizado Correctamente")
        } else {
            setOrder([...order, product])
            toast.success("Agregado al Pedido")
        }
    }

    const handleUpdateQuantity = id => {
        const productEdit = order.filter(product => product.id === id)[0]
        setProduct(productEdit)
        setModal(!modal)
    }

    const handleDeleteProduct = id => {
        const newOrder = order.filter(product => product.id !== id)
        setOrder(newOrder)
        toast.success("Producto Eliminado Correctamente")
    }

    const handleSubmitNewOrder = async (data) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (!token) {
            console.error('No hay token de autenticación');
            window.location.href = '/login';
            toast.error('Usuario No autenticado');
            return;
        }

        try {
            console.log('Enviando datos:', data);

            const response = await axiosClient.post('api/orders', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log('Respuesta del servidor:', response.data);
            toast.success(response.data.message);
            setTimeout(() => {
                setOrder([])
            }, 1000);
            return response.data;

        } catch (error) {

            // Manejo específico de errores HTTP
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
                    // Redirigir a login
                    localStorage.removeItem(AUTH_TOKEN_KEY);
                    window.location.href = '/login';
                } else if (error.response.status === 422) {
                    // Errores de validación de Laravel
                    const errors = error.response.data.errors;
                    toast.error(`Error de validación: ${Object.values(errors).join('\n')}`);
                } else {
                    toast.error(`Error del servidor: ${error.response.data.message || 'Intente nuevamente'}`);
                }
            } else {
                toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
            }

            throw error;
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categories,
                currentCategory,
                product,
                modal,
                total,
                order,
                handleClickCategory,
                handleClickModal,
                handleSetProduct,
                handleAddOrder,
                handleUpdateQuantity,
                handleDeleteProduct,
                handleSubmitNewOrder
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext