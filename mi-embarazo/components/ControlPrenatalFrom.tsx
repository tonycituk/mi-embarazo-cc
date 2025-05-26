import React from "react";
import Input from "./ui/Input";
import TextField from "./ui/TextField";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { t } from "i18next";

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
        label={t("patients.prenatal-tab-info.data.weight")}
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.weight || ""}
        onChange={handleChange}
      />
      <Input
        name="bloodPressure"
        label={t("patients.prenatal-tab-info.data.blood-pressure")}
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.bloodPressure || ""}
        onChange={handleChange}
      />
      <Input
        name="fetalHeartRate"
        label={t("patients.prenatal-tab-info.data.fetal-heart-rate")}
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.fetalHeartRate || ""}
        onChange={handleChange}
      />
      <Input
        name="fetalStatus"
        label={t("patients.prenatal-tab-info.data.fetal-status")}
        type="text"
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.fetalStatus || ""}
        onChange={handleChange}
      />
      <TextField
        name="observations"
        label={t("patients.prenatal-tab-info.data.observations")}
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.observations || ""}
        onChange={handleChange}
      />
      <TextField
        name="prescription"
        label={t("patients.prenatal-tab-info.data.prescription")}
        disabled={!isEditing || isLoading || !isEditable}
        value={formData?.prescription || ""}
        onChange={handleChange}
      />
    </>
  );
}
