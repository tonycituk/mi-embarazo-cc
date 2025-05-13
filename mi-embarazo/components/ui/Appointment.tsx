"use client";

import { useState } from "react";
import DeleteModal from "./DeleteModal";

interface AppointmentProps {
  name: string;
  time: string;
  status: boolean; // Cita activa o no
  isSavingDetails?: boolean;
  onStartAppointment?: () => void;
  onEndAppointment?: () => void;
}

export default function Appointment({
  name,
  time,
  status,
  onStartAppointment,
  onEndAppointment,
}: AppointmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgColor = status ? "bg-[#FFD6FD]" : "bg-[#FFE7FE]";

  const handleEndClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmEnd = () => {
    onEndAppointment?.();
    setIsModalOpen(false);
  };

  return (
    <article className={`${bgColor} shadow-sm rounded-lg p-6 text-black`}>
      <section className="flex justify-between items-center w-full">
        <h3 className="text-lg font-light">{name}</h3>
        <div className="flex space-x-2">
          {status ? (
            <button
              className="text-[--primary-color] border border-[--primary-color] rounded-md py-1 px-2 hover:bg-[#d144c9]/50"
              onClick={handleEndClick}
            >
              Terminar
            </button>
          ) : (
            <button
              className="text-[--primary-color] border border-[--primary-color] rounded-md py-1 px-2 hover:bg-[#d144c9]/50"
              onClick={onStartAppointment}
            >
              Iniciar
            </button>
          )}
        </div>
      </section>

      <p className="font-bold">{time}</p>

      <DeleteModal
        title={`Terminar cita con ${name}`}
        message="¿Estás seguro que quieres finalizar la cita?"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmEnd}
      />
    </article>
  );
}
