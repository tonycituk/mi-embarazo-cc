import { Modal } from "@mui/material";
import Input from "./Input";
import { useEffect, useState } from "react";
import { AppointmentModel } from "@/src/models/AppointmentModel";
import { DateTime } from "luxon";
import {
  createAppointment,
  updateAppointmentDetails,
} from "@/src/services/citasService";
import { PatientModel } from "@/src/models/PatientModel";

const resetForm: AppointmentModel = new AppointmentModel(
  "",
  "",
  "",
  "",
  "",
  null!,
  DateTime.now().toISODate(),
  DateTime.now().toFormat("HH:mm"),
  "Nuevo paciente",
  "Confirmada",
  0,
  "",
  "",
  "",
  "",
  ""
);

export default function CitasModal({
  isOpen,
  onClose,
  appointment,
  availablePatients,
  fetchData,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointment?: AppointmentModel;
  availablePatients: PatientModel[];
  fetchData: () => void;
}) {
  const [formData, setFormData] = useState<AppointmentModel>(resetForm);

  useEffect(() => {
    if (appointment) {
      const formattedAppointment = {
        ...appointment,
        time: DateTime.fromFormat(appointment.time, "HH:mm").toFormat("HH:mm"),
        date: DateTime.fromISO(appointment.date).toFormat("yyyy-MM-dd"),
        status: appointment.status === "" ? "Confirmada" : appointment.status,
        date_type:
          appointment.date_type === ""
            ? "Nuevo paciente"
            : appointment.date_type,
      };
      setFormData(formattedAppointment);
    }
  }, [appointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "patient") {
      const selectedPatient = availablePatients.find(
        (patient) => patient._id === value
      );

      if (selectedPatient) {
        setFormData((prevData) => ({
          ...prevData,
          patient_name: selectedPatient.personalData.name,
          record: selectedPatient.record,
          patient: selectedPatient._id,
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const saveNewAppointment = async (appointment: AppointmentModel) => {
    try {
      await createAppointment(appointment);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  const updateAppointment = async (appointment: AppointmentModel) => {
    try {
      await updateAppointmentDetails(appointment);
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointment !== undefined) {
      updateAppointment(formData);
    } else {
      const { _id, ...formDataWithoutId } = formData;

      saveNewAppointment(formDataWithoutId as AppointmentModel);
      setFormData(resetForm);
    }

    onClose();
    fetchData();
  };

  const handleCancel = () => {
    if (!appointment) setFormData(resetForm);
    onClose();
  };

  return (
    <Modal open={isOpen}>
      <div className="bg-white p-8 w-[30rem] mx-auto mt-20 rounded-md">
        <h2 className="text-2xl font-bold">
          {appointment ? "Editar cita" : "Nueva cita"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <label
            className="text-[#8b8b8b] text-sm font-bold"
            htmlFor="paciente"
          >
            Nombre
          </label>
          <select
            id="patient"
            name="patient"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[--primary-color]"
            onChange={handleChange}
            value={formData.patient as string}
            disabled={appointment !== undefined}
          >
            {appointment ? (
              <option value={appointment.patient as string}>
                {appointment.patient_name}
              </option>
            ) : (
              <option value="">Seleccionar paciente</option>
            )}
            {!appointment &&
              availablePatients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.personalData.name}
                </option>
              ))}
          </select>
          <Input
            label="Expediente"
            name="record"
            type="text"
            value={formData.record}
            onChange={handleChange}
            disabled
          />
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              label="Fecha de cita"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label="Hora de cita"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2">
            <div className="space-y-1 flex-1">
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="type"
              >
                Tipo de cita
              </label>
              <select
                id="date_type"
                name="date_type"
                className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[--primary-color]"
                value={formData.date_type}
                onChange={handleChange}
              >
                <option
                  className="hover:bg-[--primary-color-light]"
                  value="Nuevo paciente"
                >
                  Nuevo paciente
                </option>
                <option
                  className="hover:bg-[--primary-color-light]"
                  value="Seguimiento"
                >
                  Seguimiento
                </option>
              </select>
            </div>
            <div className="space-y-1 flex-1">
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="status"
              >
                Estado
              </label>
              <select
                id="status"
                name="status"
                className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[--primary-color]"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Confirmada">Confirmada</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
          </div>
          <section className="flex space-x-2">
            <button
              type="submit"
              className="bg-[--primary-color] text-white rounded-md p-2 w-full"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-100 text-red-700 rounded-md p-2 w-full hover:bg-red-200"
            >
              Cancelar
            </button>
          </section>
        </form>
      </div>
    </Modal>
  );
}
