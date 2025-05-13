import { Modal } from "@mui/material";

export default function DeleteModal({
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
  onConfirm?: () => void;
}) {
  return (
    <Modal open={isOpen}>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-1/3 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-[--primary-color] text-white rounded-md p-2 w-full"
              onClick={onConfirm}
            >
              Eliminar
            </button>
            <button
              className="bg-red-100 text-red-700 rounded-md p-2 w-full hover:bg-red-200"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
