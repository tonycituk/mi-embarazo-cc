"use client";

import { getPatientById } from "@/src/services/pacienteService";
import Avatar from "./ui/Avatar";
import PatientRecord from "./ui/PatientRecord";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { LinearProgress } from "@mui/material";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { getAppointmentByPatient } from "@/src/services/citasService";

export default function DetallesPaciente({
  params,
}: {
  params: { record: string };
}) {
  const { record } = params;
  const [patient, setPatient] = useState<PatientModel>(new PatientModel());
  const [previousAppointment, setPreviousAppointment] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetailsModel[]
  >([
    {
      _id: "",
      doctor: "",
      patient: "",
      date: "",
      time: "",
      date_type: "",
      status: "",
      patient_name: "",
      record: "",
      file: "",
      weight: 0,
      bloodPressure: "",
      fetalHeartRate: "",
      fetalStatus: "",
      observations: "",
      prescription: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (record) {
      const fetchData = async () => {
        try {
          const [fetchedPatient, fetchedAppointmentDetails] = await Promise.all(
            [getPatientById(record), getAppointmentByPatient(record)]
          );

          setPatient(fetchedPatient);

          if (fetchedAppointmentDetails.length > 0) {
            setAppointmentDetails(fetchedAppointmentDetails);
            setAppointmentDate(
              fetchedAppointmentDetails[fetchedAppointmentDetails.length - 1]
                .date
            );
            if (fetchedAppointmentDetails.length > 1) {
              setPreviousAppointment(
                fetchedAppointmentDetails[fetchedAppointmentDetails.length - 2]
                  .date
              );
            } else {
              setPreviousAppointment("");
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  const lastAppointmentDate = new Date(
    previousAppointment ? previousAppointment : appointmentDate
  ).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <section className="pb-4">
        <div className="flex gap-4 items-center">
          <Avatar name={patient.personalData.name} />
          <h1 className="text-3xl font-bold">{patient.personalData.name}</h1>
        </div>
        <p className="text-gray-400 pt-1">
          <span className="font-bold">Última cita:</span>{" "}
          {appointmentDate ? lastAppointmentDate : "Sin citas"}
        </p>
      </section>
      <PatientRecord
        patient={patient}
        appointmentDetails={appointmentDetails}
        isPatientLoading={isLoading}
      />
      {isLoading && (
        <LinearProgress
          color="secondary"
          sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        />
      )}
    </div>
  );
}
