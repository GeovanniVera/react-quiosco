import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { useRef, useState } from "react"; // Cambiamos createRef por useRef

export default function Login() {
  //paso 1 obtener la función de login mediante el destructuring del useAuth
  const { login } = useAuth({ middleware: 'guest', url: '/' });

  //paso 2
  const [errores, setErrores] = useState([]);
  
  // paso 3 Referencias de los inputs - Cambiamos createRef por useRef
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //paso 4 usar el login función 
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita la propagación
    setErrores([]);

    //paso 5 objeto con los valores del formulario 
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    await login(data, setErrores);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col mb-2">
          <h1 className="text-lg md:text-2xl">
            Inicia Sesión con tus credenciales.
          </h1>
        </div>

        {/* si existen errores los muestra en pantalla */}
        {Object.keys(errores).length > 0 &&
          Object.values(errores).map((error, i) => (
            <Alerta key={i}>{error[0]}</Alerta>
          ))}

        <Input
          label="Correo Electrónico:"
          type="email"
          name="email"
          id="email"
          placeholder="Juan-Pablo@gmail.com"
          autoFocus
          required
          ref={emailRef}
        />

        <Input
          label="Contraseña:"
          type="password"
          name="password"
          id="password"
          required
          ref={passwordRef}
        />
        
        <div className="flex flex-col mt-8">
          <input
            type="submit"
            className="py-2 px-4 bg-amber-300 text-gray-700 rounded-xl hover:bg-amber-400 transition-all cursor-pointer hover:shadow-2xl"
            value={'Inicia Sesión'}
          />
        </div>
        
        <div className="flex flex-col mt-4">
          <Link
            to="/auth/register"
            className="text-gray-500 hover:text-gray-800">
            ¿Aún no tienes una cuenta?
            <span className="ms-2 text-amber-300 hover:text-amber-500">
              regístrate
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}