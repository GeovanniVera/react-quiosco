import { productos as data } from "../data/products";
import Products from "../components/Products";
import useQuiosco from "../hooks/useQuiosco";

export default function Home() {

  const { currentCategory } = useQuiosco()
  const productos = data.filter(producto =>
    producto.categoria_id === currentCategory.id
  )
  return (
    <div className="px-5">
      <h2 className="text-4xl font-bold">{currentCategory.name}</h2>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación.</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Products key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
