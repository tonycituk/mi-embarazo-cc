import { Modal } from "@mui/material";

export default function DeleteModalDoctor({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void; // Hacemos que onConfirm sea obligatorio
}) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-1/3 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
              onClick={onConfirm} // Siempre llamamos a la función de confirmación
            >
              Eliminar
            </button>
            <button
              className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300"
              onClick={onClose} // Cerramos el modal
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
