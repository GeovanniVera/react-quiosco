import { formatQuantity } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Products({ producto }) {

    const { nombre, precio, imagen, categoria_id, id } = producto
    const { handleClickModal, handleSetProduct } = useQuiosco()
    
    return (
        <div className="mb-5 border-0 p-3 shadow-2xl">
            <img
                src={`img/${imagen}.jpg`}
                alt={nombre}
                className="w-full" />
            <div className="p-5">
                <p className=" text-xl text-gray-500  ">{nombre}</p>
                <p className="text-2xl text-amber-300  font-bold">
                    {formatQuantity(precio)}
                </p>
                <button
                    type="button"
                    onClick={() => { handleClickModal(), handleSetProduct(producto) }}
                    className="bg-amber-500 text-white uppercase font-bold rounded-sm py-2 w-full mt-4 cursor-pointer hover:bg-amber-700 "
                >
                    Agregar Producto
                </button>
            </div>
        </div>
    )
}
