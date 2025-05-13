import React from "react";
import Input from "./ui/Input";
import TextField from "./ui/TextField";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";

interface ControlPrenatalFormProps {
  formData: AppointmentDetailsModel;
  updateData: (data: (prevData: any) => any) => void;
  isEditing?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
  setIsAppointmentDataChanged?: (isChanged: boolean) => void;
}

export default function ControlPrenatalForm({
  formData,
  updateData,
  isLoading,
  isEditing = true,
  isEditable = true,
  setIsAppointmentDataChanged = () => {},
}: ControlPrenatalFormProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateData((prevData) => ({ ...prevData, [name]: value }));
    setIsAppointmentDataChanged(true);
  };

  return (
    <>
      <Input
        name="weight"
        label="Peso"
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.weight || ""}
        onChange={handleChange}
      />
      <Input
        name="bloodPressure"
        label="Presión arterial"
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.bloodPressure || ""}
        onChange={handleChange}
      />
      <Input
        name="fetalHeartRate"
        label="Frecuencia cardiaca fetal"
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.fetalHeartRate || ""}
        onChange={handleChange}
      />
      <Input
        name="fetalStatus"
        label="Estado fetal"
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.fetalStatus || ""}
        onChange={handleChange}
      />
      <TextField
        name="observations"
        label="Observaciones"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.observations || ""}
        onChange={handleChange}
      />
      <TextField
        name="prescription"
        label="Prescripción"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.prescription || ""}
        onChange={handleChange}
      />
    </>
  );
}
