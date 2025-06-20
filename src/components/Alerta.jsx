// src/components/Alerta.jsx
const Alerta = ({ children }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
      {children}
    </div>
  );
};

export default Alerta;