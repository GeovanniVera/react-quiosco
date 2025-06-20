import { formatQuantity } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Products( {product} ) {
    
    const { name , price , image , id , category_id } = product
    const { handleClickModal, handleSetProduct } = useQuiosco()
    

    return (
        <div className="mb-5 border-0 p-3 shadow-2xl">
            <img
                src={`img/${image}.jpg`}
                alt={name}
                className="w-full" />
            <div className="p-5">
                <p className=" text-xl text-gray-500  ">{name}</p>
                <p className="text-2xl text-amber-300  font-bold">
                    {formatQuantity(price)}
                </p>
                <button
                    type="button"
                    onClick={() => { handleClickModal(), handleSetProduct(product) }}
                    className="bg-amber-500 text-white uppercase font-bold rounded-sm py-2 w-full mt-4 cursor-pointer hover:bg-amber-700 "
                >
                    Agregar Producto
                </button>
            </div>
        </div>
    )
}
