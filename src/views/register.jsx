import { Link } from "react-router-dom";
import Input from "../components/input";

export default function Register() {
  return (
    <div className="">
      {/* Formulario de Registro */}
      <form action="" >
        
        <div className="flex flex-col mb-2">
          <h1
            className="text-lg md:text-2xl text-gray-500 hover:text-gray-700">
            Registra tu cuenta llenando este formulario.
          </h1>
        </div>

        <Input
          label="Nombre"
          type="text"
          name="name"
          id="name"
          placeholder="Juan Pablo"
          autoFocus
          required
        />

        <Input
          label="Correo Electrónico:"
          type="email"
          name="email"
          id="email"
          placeholder="Juan-Pablo@gmail.com"
          required
        />
        
        <Input
          label="Contraseña:"
          type="password"
          name="password"
          id="password"
          required
        />

      <Input
          label="Confirma tu contraseña:"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          required
        />
   
        <div className="flex flex-col mt-8">
          <input
            type="submit"
            className="py-2 px-4 bg-amber-300 text-gray-700 rounded-xl hover:bg-amber-400 transition-all cursor-pointer hover:shadow-2xl"
            value={'Crear Cuenta'}
          />
        </div>
        <div className="flex flex-col mt-4">
          <Link
            to="/auth/"
            className="text-gray-500 hover:text-gray-800">
            ¿Ya tienes una cuenta?
            <span
              className="ms-2 text-amber-300 hover:text-amber-500">
              Inicia Sesión
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}
