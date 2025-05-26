"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/ui/AppointmentsTable";
import CitasModal from "@/components/ui/CitasModal";
import Input from "@/components/ui/Input";
import DeleteModal from "@/components/ui/DeleteModal";
import {
  deleteAppointment,
  getAllAppointments,
  getAppointmentByDoctor,
} from "@/src/services/citasService";
import { AppointmentModel } from "@/src/models/AppointmentModel";
import { getAllPatients } from "@/src/services/pacienteService";
import { PatientModel } from "@/src/models/PatientModel";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function CitasPage({ role }: { role: "doctor" | "admin" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    AppointmentModel | undefined
  >(undefined);
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [availablePatients, setAvailablePatients] = useState<PatientModel[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { user } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsData, patientsData] = await Promise.all([
        role == "admin" ? getAllAppointments() : getAppointmentByDoctor(),
        getAllPatients(),
      ]);
      if (role === "doctor") {
        const doctorsPatients = patientsData.filter(
          (patient) => patient.doctor === user?._id
        );
        setAvailablePatients(doctorsPatients);
      } else setAvailablePatients(patientsData);
      setAppointments(appointmentsData);

      if (appointmentsData.length === 0) {
        enqueueSnackbar(t("appointments.empty-appointments-message.snackbar"), {
          variant: "info",
        });
      }
    } catch (error) {
      enqueueSnackbar(t("appointments.error-appointments-message.snackbar"), {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewAppointment = () => {
    setSelectedAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentModel) => {
    setSelectedAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: AppointmentModel) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAppointment = async () => {
    try {
      setIsDeleteModalOpen(false);
      setIsLoading(true);
      await deleteAppointment(selectedAppointment!._id);

      setAppointments((prevAppointments) =>
        prevAppointments.filter((a) => a._id !== selectedAppointment!._id)
      );

      enqueueSnackbar(t("appointments.delete-success-message.snackbar"), {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(t("appointments.delete-error-message.snackbar"), {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment.patient_name.toLowerCase();
    const appointmentDate = appointment.date.toLowerCase();
    const status = appointment.status?.toLowerCase();
    const record = appointment.record?.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();

    // Check if search term matches any of the relevant fields
    return (
      patientName.includes(searchTerm) ||
      appointmentDate.includes(searchTerm) ||
      status.includes(searchTerm) ||
      record.includes(searchTerm)
    );
  });

  return (
    <main>
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-bold">
          {t("appointments.appointment-page-title")}
        </h1>
        <button
          className="bg-[--primary-color] text-white rounded-md p-2 px-8"
          onClick={handleNewAppointment}
        >
          {t("btn-new-appointment")}
        </button>
      </section>
      <Input
        name="search"
        placeholder={t("appointments.search-placeholder")}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <AppointmentsTable
        appointments={filteredAppointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
        role={role} // Asegúrate de pasar role aquí
        isLoading={isLoading}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t("appointments.modal-delete.title")}
        message={t("appointments.modal-delete.message")}
        onConfirm={() => {
          confirmDeleteAppointment();
        }}
      />

      <CitasModal
        isOpen={isCitasModalOpen}
        onClose={() => setIsCitasModalOpen(false)}
        appointment={selectedAppointment}
        availablePatients={availablePatients}
        fetchData={fetchData}
      />
    </main>
  );
}
