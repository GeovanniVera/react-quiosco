import { createContext, useState } from 'react'
import { categories as categoriesDB } from "../data/categories"


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    //Hooks

    const [categories , setCategories] = useState(categoriesDB);
    const [currentCategory , setCurrentCategory] =  useState(categories[0])    
    const [modal , setModal] =  useState(false)    
    const [product , setProduct] =  useState({})
    const [order , setOrder] =  useState([])    


    
    //Funciones 
    
    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setCurrentCategory(category)
    }

    const handleClickModal = () => {
        setModal(!modal)        
    }

    const handleSetProduct = (product) => {
        setProduct(product)
    }

    const handleAddOrder = ({categoria_id , imagen , ...product}) => {
        setOrder([...order , product])
        
    }

    const handleUpdateOrder = () => {
        
    }
    
    return (
        <QuioscoContext.Provider 
            value={{
               categories,
               currentCategory,
               product,
               modal,
               order,
               handleClickCategory,
               handleClickModal,
               handleSetProduct,
               handleAddOrder
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