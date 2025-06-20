import useSWR from "swr";
import useQuiosco from "../hooks/useQuiosco";
import Products from "../components/Products";
import axiosClient from "../config/axios";

export default function Home() {

  const { currentCategory } = useQuiosco()
  
  const fetcher = () => axiosClient('api/products').then(data => data.data)
  const { data , error , isLoading } = useSWR('api/products', fetcher,{
    refreshInterval: 1000
  })
  
  if(isLoading) return "Cargando...";
  
  const products = data.data.filter(product => product.category_id === currentCategory.id)
  

  return (
    <div className="px-5">
      <h2 className="text-4xl font-bold">{currentCategory.name}</h2>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación.</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
