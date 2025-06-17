import useQuiosco from "../hooks/useQuiosco";
import OrderProduct from "./OrderProduct";

export default function Summary() {

  const { order } = useQuiosco()

  return (
    <aside className="w-80 h-screen sticky top-0 bg-gray-100 p-5 shadow-2xl overflow-y-auto">
      <h1 className="text-2xl font-bold">Resumen de la Compra</h1>
      {/* Agrega aquí el contenido del resumen */}
      <div className="py-10">
        {order.length === 0 ? (
          <p>Aqui podras ver el resumen y tus totales de tu pedido.</p>
        ) : (
          order.map(product => (
            <OrderProduct
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total :
      </p>

      <form
        className="w-full"
      >
        <div className="mt-5">
          <input
            type="submit"
            className="bg-amber-500 hover:bg-amber-700 uppercase font-bold px-5 py-2 text-white text-center w-full cursor-pointer rounded"
            value={"Confirmar Pedido"}
          />
        </div>
      </form>
    </aside>
  );
}
