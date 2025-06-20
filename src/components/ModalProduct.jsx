import { useState , useEffect } from "react"
import useQuiosco from "../hooks/useQuiosco"
import { formatQuantity } from "../helpers"
export default function ModalProduct() {

    const { handleClickModal, product , handleAddOrder, order } = useQuiosco()
    
    const [quantity, setQuantity] = useState(1)
    const [edit, setEdit] = useState(false)
    

    useEffect (() => {
        if(order.some(orderState => orderState.id === product.id )){
            const productEdit = order.filter(orderState => orderState.id === product.id)[0]
            setQuantity(productEdit.quantity)
            setEdit(true)
        }
    }, [order])
    
    const handlePlusQuantity = () => {
        if (quantity < 5) {
            setQuantity(quantity + 1)
        }
    }

    const handleMinorQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        //Imagen
        <div className="md:flex  gap-10">
            <div className="md:w-1/3">
                <img
                    className="rounded"
                    src={`/img/${product.image}.jpg`}
                    alt={`Imagen Alternativa ${product.name}`}

                />

            </div>
            {/* Información */}
            <div className="md:w-2/3">
                {/* Boton de Cierre */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => { handleClickModal() }}
                        className="text-red-700 cursor-pointer font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>
                <div className="flex flex-col items-center justify-center mt-10">
                    {/* Titulo */}
                    <h1
                        className="text-3xl font-bold text-yellow-800"
                    >
                        {product.name}
                    </h1>
                    {/* Cantidad */}
                    <p
                        className="mt-5 font-black text-5xl text-amber-500 "
                    >
                        {formatQuantity(product.price)}
                    </p>
                    {/* Botones */}

                    <div className="flex items-center gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleMinorQuantity}
                            aria-label="Disminuir cantidad"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold shadow-md transition-all duration-200 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <p className="text-lg font-bold text-gray-900 w-8 text-center">{quantity}</p>
                        <button
                            type="button"
                            onClick={handlePlusQuantity}
                            aria-label="Aumentar cantidad"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold shadow-md transition-all duration-200 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            handleAddOrder({...product , quantity}),
                            handleClickModal()
                        }}
                        className="bg-amber-500 hover:bg-amber-700 px-5 py-2 mt-6 text-white font-bold uppercase cursor-pointer rounded"
                    >
                        {edit ? 'Guardar Cambios' : 'Añadir al pedido'}
                    </button>
                </div>
            </div>
        </div>
    )
}
