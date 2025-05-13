"use client";

import { useEffect, useState } from "react";
import Card from "./ui/Card";
import Appointment from "./ui/Appointment";
import { OpenInNewRounded } from "@mui/icons-material";

import ControlPrenatalForm from "./ControlPrenatalFrom";
import { Alert, Skeleton, Snackbar, Tooltip } from "@mui/material";
import {
  getAppointmentByDoctor,
  updateAppointmentDetails,
} from "@/src/services/citasService";
import {
  AppointmentDetailsModel,
  AppointmentModel,
} from "@/src/models/AppointmentModel";
import { DateTime } from "luxon";
import DateNavigator from "@/components/DateNavigator";

export default function DoctorDashboardPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    _id: "",
  });
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentModel[]
  >([]);
  const [date, setDate] = useState(DateTime.now());
  const [formData, setFormData] = useState<AppointmentDetailsModel>(
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [currentPatient, setCurrentPatient] =
    useState<null | AppointmentDetailsModel>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loadAppointments = async () => {
    setIsLoading(true);
    const fetchedAppointments = await getAppointmentByDoctor();
    setAppointments(fetchedAppointments);

    setDate(DateTime.now());

    const todayAppointments = fetchedAppointments.filter(
      (appointment) =>
        DateTime.fromISO(appointment.date).toISODate() === date.toISODate()
    );
    setFilteredAppointments(todayAppointments);
    console.log("Today's appointments -> ", todayAppointments);
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user_info") || "{}"));
    setCurrentPatient(null);
    localStorage.removeItem("currentPatient");

    loadAppointments().finally(() => setIsLoading(false));
  }, []);

  const handleEndAppointment = async () => {
    if (currentPatient) {
      setIsSavingDetails(true);
      setSnackbarOpen(true);
      setSnackbarMessage("Finalizando cita...");
      const parsedDate = DateTime.fromISO(currentPatient.date).toISODate();
      const formDataParsed = {
        ...formData,
        date: parsedDate || DateTime.now().toISODate(),
        status: "Finalizada",
      };
      await updateAppointmentDetails(formDataParsed).finally(() => {
        setCurrentPatient(null);
        setIsSavingDetails(false);
        localStorage.removeItem("currentPatient");
        localStorage.removeItem("currentPatientDetails");
        setSnackbarMessage("Cita finalizada correctamente");
        setSnackbarOpen(true);
      });
    }
  };

  const handleStartAppointment = (appointment: AppointmentModel) => {
    setCurrentPatient(appointment); // Starts a new appointment
    const parsedDate = DateTime.fromISO(appointment.date).toISODate();
    const parsedData = {
      ...appointment,
      date: parsedDate || DateTime.now().toISODate(),
    };
    setFormData(parsedData);
    localStorage.setItem("currentPatient", JSON.stringify(appointment));
    localStorage.setItem("currentPatientDetails", JSON.stringify(parsedData));
  };

  const handleDateChange = (newDate: DateTime) => {
    setDate(newDate);
    const matchingAppointments = appointments.filter(
      (appointment) =>
        DateTime.fromISO(appointment.date).toISODate() === newDate.toISODate()
    );
    console.log("Matching appointments -> ", matchingAppointments);
    setFilteredAppointments(matchingAppointments);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">Bienvenido/a {userInfo.name},</h1>
      <p className="text-gray-400 font-light pt-1">
        Revisa la información general sobre el paciente y las próximas citas.
      </p>
      <article>
        <section className="flex space-x-8 pt-8">
          {isLoading ? (
            <Skeleton className="flex-1" height={"24rem"} />
          ) : (
            <Card
              title="Citas programadas"
              action={
                <DateNavigator
                  isDisabled={isLoading}
                  date={date}
                  onDateChange={(newDate) => {
                    if (newDate) handleDateChange(newDate);
                  }}
                />
              }
              className="flex-1"
            >
              <div className="space-y-4 h-96 overflow-auto">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment, index) => (
                    <Appointment
                      key={index}
                      name={appointment.patient_name}
                      time={appointment.time}
                      isSavingDetails={isSavingDetails}
                      status={currentPatient === appointment}
                      onStartAppointment={() =>
                        handleStartAppointment(appointment)
                      }
                      onEndAppointment={handleEndAppointment}
                    />
                  ))
                ) : (
                  <p>No hay citas programadas</p>
                )}
              </div>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="flex-1" height={"24rem"} />
          ) : (
            <Card
              className="flex-1"
              title={
                currentPatient
                  ? `Notas de ${currentPatient?.patient_name}`
                  : "Notas"
              }
              action={
                currentPatient && (
                  <div className="space-x-2">
                    <Tooltip title="Ver expediente" placement="top-start">
                      <button
                        className="border border-[--primary-color] text-[--primary-color] rounded-md py-1 px-2 hover:bg-[#f7d0f4]"
                        aria-label="Ver expediente"
                        onClick={() =>
                          window.open(
                            `/doctor/pacientes/${currentPatient?.patient}`,
                            "_blank"
                          )
                        }
                      >
                        <OpenInNewRounded fontSize="inherit" />
                      </button>
                    </Tooltip>
                  </div>
                )
              }
            >
              {currentPatient && (
                <div className="h-96 overflow-auto">
                  <ControlPrenatalForm
                    formData={formData}
                    updateData={setFormData}
                    isLoading={isSavingDetails}
                  />
                </div>
              )}
            </Card>
          )}
        </section>
      </article>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarMessage.includes("finalizada") ? 3000 : null}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      >
        <Alert
          severity={
            snackbarMessage.toLowerCase().includes("finalizada")
              ? "success"
              : "info"
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}
