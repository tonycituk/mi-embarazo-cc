"use client";

import { Button, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { savePatientDetails } from "@/src/services/pacienteService";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { DateTime } from "luxon";
import { updateAppointmentDetails } from "@/src/services/citasService";

export default function PatientRecord({
  patient,
  appointmentDetails,
  isPatientLoading,
}: {
  patient: PatientModel;
  appointmentDetails: AppointmentDetailsModel[];
  isPatientLoading: boolean;
}) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());
  const [controlPrenatalformData, setcontrolPrenatalFormData] =
    useState<AppointmentDetailsModel>(
      new AppointmentDetailsModel(
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
      )
    );
  const [isPatientDataChanged, setIsPatientDataChanged] = useState(false);
  const [isAppointmentDataChanged, setIsAppointmentDataChanged] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateData = (data: PatientModel) => {
    setFormData((prevData) => ({
      ...prevData,
      personalData: { ...prevData.personalData, ...data },
      pregnancyData: { ...prevData.pregnancyData, ...data },
      medicalHistory: { ...prevData.medicalHistory, ...data },
    }));
    setIsPatientDataChanged(true);
  };

  const detailsTabProps = {
    isEditing,
    formData,
    isLoading,
    updateData,
  };

  const controlPrenatalProps = {
    isEditing,
    formData: controlPrenatalformData,
    updateData: setcontrolPrenatalFormData,
    isPatientLoading,
    isLoading,
    appointments: appointmentDetails,
    setIsAppointmentDataChanged,
  };

  const tabs = [
    {
      label: "Detalles",
      component: <DetailsTab value={tab} index={0} {...detailsTabProps} />,
    },
    {
      label: "Control prenatal",
      component: (
        <ControlPrenatalTab value={tab} index={1} {...controlPrenatalProps} />
      ),
    },
  ];

  useEffect(() => {
    if (patient) {
      setcontrolPrenatalFormData(
        appointmentDetails[appointmentDetails.length - 1]
      );
      setFormData(patient);
    } else {
    }
  }, [patient]);

  const handleSaveButton = async () => {
    if (isEditing) {
      try {
        setIsLoading(true);

        if (isPatientDataChanged) {
          const patientDataWithoutId = { ...formData };
          delete patientDataWithoutId._id;
          await savePatientDetails(patient._id!, patientDataWithoutId).finally(
            () => {
              setIsPatientDataChanged(false);
            }
          );
        }

        if (isAppointmentDataChanged) {
          const appointmentDataWithParsedDate = {
            ...controlPrenatalformData,
            date:
              DateTime.fromISO(controlPrenatalformData.date).toISODate() ||
              DateTime.now().toISODate(),
          };
          await updateAppointmentDetails(appointmentDataWithParsedDate).finally(
            () => {
              setIsAppointmentDataChanged(false);
            }
          );
        }
      } catch (error) {
        console.error("Error saving patient details:", error);
      } finally {
        setIsLoading(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

 const descargarExpedienteJSON = async (patientId: string) => {
  const token = localStorage.getItem('accessToken'); // Cambiado a accessToken
  if (!token) {
    alert("Por favor inicia sesión");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/patients/${patientId}/download`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

      if (!response.ok) throw new Error("Error al descargar el expediente");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `expediente-${patientId}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("No autorizado: Inicia sesión nuevamente");
    }

  };



  return (
    <div>
      <div className="flex gap-4 justify-end">
{!isEditing && (
  <Button
    onClick={() => {
      if (formData._id) { // Verifica que _id existe
        descargarExpedienteJSON(formData._id);
      }
    }}
    variant="outlined"
    color="primary"
    disabled={isLoading || isPatientLoading || !formData._id}
  >
    Descargar expediente (JSON)
  </Button>
)}
        {isEditing && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditing(false)}
            disabled={isLoading || isPatientLoading}
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleSaveButton}
          variant="contained"
          color="secondary"
          disabled={isLoading || isPatientLoading}
        >
          {isEditing ? (isLoading ? "Guardando..." : "Guardar") : "Editar"}
        </Button>
      </div>
      <Tabs
        value={tab}
        textColor="secondary"
        indicatorColor="secondary"
        className="mb-6"
        onChange={(e, newValue) => setTab(newValue)}
      >
        {tabs.map((tabItem, index) => (
          <Tab key={index} value={index} label={tabItem.label} />
        ))}
      </Tabs>
      {tabs.map(
        (tabItem, index) =>
          tab === index && <div key={index}>{tabItem.component}</div>
      )}
    </div>
  );
}
