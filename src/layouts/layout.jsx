import { Outlet } from "react-router-dom"
import Modal from 'react-modal'
import Sidebar from "../components/sidebar"
import Summary from "../components/summary"
import ModalProduct from "../components/ModalProduct"
import useQuiosco from "../hooks/useQuiosco";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')

export default function Layout() {
  const { modal, product } = useQuiosco()

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>

        {/* Summary */}
        <Summary />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProduct />
      </Modal>

    </>
  );
}