import useQuiosco from "../hooks/useQuiosco"
import Category from "./Category"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {

  const {categories}  = useQuiosco()
  const { logout , user } = useAuth({middleware :'auth' , url : '/'})
  

  return (
    <aside className="w-72 h-screen sticky top-0 shadow-2xl bg-white">
      <div className="p-4">
        <img src="img/logo.svg" alt="Logo de Fresh Coffee" className="w-40" />
      </div>
      <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold ">{user?.name}</h1>
        </div>
      <div className="mt-10 px-4">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
        <div className="mt-5">
          <button 
          type="button"
          onClick={logout}
          className="bg-rose-600 hover:bg-rose-800 text-white py-2 px-5 w-full cursor-pointer font-bold">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
}