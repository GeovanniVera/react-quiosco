// src/pages/Register.jsx
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);


  //usa un estado para guardar y usar los errores 
  const [errores, setErrores] = useState([]);

  //Hook custom para manejar el registro
  const { registro } = useAuth({ middleware: 'guest', url: '/' });
  
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  //Codigo clave recolecta los datos del formulario y los envía al backend mediante registro(datos, setErrores).
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
    setErrores({ password_confirmation: ["Las contraseñas no coinciden"] });
    return; // Detiene el envío si no coinciden
  }

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    //se mandan los valores del formulario mediante los refs a el hook personalizable
    await registro(datos, setErrores);
  };

  // Componente retornado
  return (
    <div className="max-w-md mx-auto p-5">
      <div className="flex flex-col mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-700">Crea tu Cuenta</h1>
        <p className="text-gray-500 mt-2">Registra tu cuenta llenando este formulario.</p>
      </div>

      <div className="bg-white shadow-md rounded-xl mt-6 px-5 py-8">
        <form onSubmit={handleSubmit} noValidate>
          
          {/* si existen errores los muestra en pantalla */}
          {Object.keys(errores).length > 0 &&
            Object.values(errores).map((error, i) => (
              <Alerta key={i}>{error[0]}</Alerta>
            ))}

          {/* uso del componente Input para crear un campo reusable */}
          <Input
            label="Nombre:"
            type="text"
            name="name"
            id="name"
            placeholder="Juan Pablo"
            autoFocus
            required
            ref={nameRef}
          />

          <Input
            label="Correo Electrónico:"
            type="email"
            name="email"
            id="email"
            placeholder="juan-pablo@gmail.com"
            required
            ref={emailRef}
          />

          <Input
            label="Contraseña:"
            type="password"
            name="password"
            id="password"
            placeholder="Tu Contraseña"
            required
            ref={passwordRef}
          />

          <Input
            label="Confirma tu Contraseña:"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Repite tu Contraseña"
            required
            ref={passwordConfirmationRef}
          />

          <div className="flex flex-col mt-6">
            <input
              type="submit"
              className="py-2 px-4 bg-amber-300 text-gray-700 rounded-xl hover:bg-amber-400 transition-all cursor-pointer hover:shadow-2xl uppercase font-bold"
              value="Crear Cuenta"
            />
          </div>
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/login" className="text-gray-500 hover:text-gray-800">
          ¿Ya tienes una cuenta?{' '}
          <span className="text-amber-300 hover:text-amber-500">Inicia Sesión</span>
        </Link>
      </nav>
    </div>
  );
}