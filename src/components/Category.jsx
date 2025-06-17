import { Link } from "react-router-dom"
import useQuiosco from "../hooks/useQuiosco";

export default function Category({ category }) {

    {/*Codigo de JS */ }
    const { name, id, icon } = category
    const {handleClickCategory, currentCategory} = useQuiosco()
    const highlightCurrentCategory = () => currentCategory.id === id ? `bg-yellow-300` :  `bg-white`
    
    {/*
        Codigo de HTML 
        Retorna un componente para cada enlace de categorias    
    */}

    return (
        <div 
            className={` ${highlightCurrentCategory()} flex items-center gap-4 border-b-2 border-gray-300 w-full p-3 hover:bg-amber-300 transition-all duration-200 `}>
            <button 
                type="button"
                onClick={() => handleClickCategory(id)}
                className="flex gap-4 items-center cursor-pointer">
                <img
                    src={`img/icono_${icon}.svg`}
                    alt="Icono de categorias"
                    className="w-10"
                />
                {name}
            </button>
        </div>
    )
}
