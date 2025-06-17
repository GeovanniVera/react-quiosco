import { Link } from "react-router-dom";
import Input from "../components/input";

export default function Login() {
  return (
    <div>
      <form action="" >
        <div className="flex flex-col mb-2">
          <h1
            className="text-lg md:text-2xl">
            Inicia Sesíon con tus credenciales.
          </h1>
        </div>

        <Input
          label="Correo Electrónico:"
          type="email"
          name="email"
          id="email"
          placeholder="Juan-Pablo@gmail.com"
          autoFocus
          required
        />

        <Input
          label="Contraseña:"
          type="password"
          name="password"
          id="password"
          autoFocus
          required
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
              registrate
            </span>
          </Link>
        </div>
      </form>

    </div>
  )
}
