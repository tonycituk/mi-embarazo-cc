"use client";

import { useEffect, useState } from "react";
import DoctorsTable from "../../../components/ui/DoctorsTable";
import DoctorsModal from "../../../components/ui/DoctorsModal";
import DeleteModalDoctor from "../../../components/ui/DeleteModalDoctor";
import Input from "../../../components/ui/Input";
import {
  addDoctor,
  deleteDoctor,
  fetchDoctors,
  updateDoctor,
} from "@/src/services/adminDoctoresService";
import { DoctorModel } from "@/src/models/DoctorModel";
import { useSnackbar } from "notistack";

export default function DoctoresPage() {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<DoctorModel | null>(
    null
  );
  const [doctor, setDoctor] = useState<DoctorModel | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);

        setFilteredDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(value)
    );
    setFilteredDoctors(filtered);
  };

  const handleNewDoctor = () => {
    setDoctor(undefined);
    setIsDoctorsModalOpen(true);
  };

  const handleSaveDoctor = async (newDoctor: DoctorModel) => {
    try {
      setLoading(true);
      if (doctor) {
        // Si el doctor ya existe, lo actualizamos
        const updatedDoctor = await updateDoctor(newDoctor);
        setDoctors((prevDoctors) =>
          prevDoctors.map((doc) =>
            doc.id === updatedDoctor.id ? updatedDoctor : doc
          )
        );
        setFilteredDoctors((prevFiltered) =>
          prevFiltered.map((doc) =>
            doc.id === updatedDoctor.id ? updatedDoctor : doc
          )
        );

        enqueueSnackbar("Doctor actualizado correctamente", {
          variant: "success",
        });
      } else {
        // Si es un nuevo doctor, lo añadimos
        const createdDoctor = await addDoctor(newDoctor);

        setDoctors((prevDoctors) => [...prevDoctors, createdDoctor]); // Actualizamos la lista completa
        setFilteredDoctors((prevFiltered) => [...prevFiltered, createdDoctor]); // Actualizamos la lista filtrada

        enqueueSnackbar("Doctor creado correctamente", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error guardando el doctor:", error);

      enqueueSnackbar("Error al guardar el doctor", {
        variant: "error",
      });
    } finally {
      setIsDoctorsModalOpen(false); // Cerramos el modal
      setLoading(false);
    }
  };

  const openDeleteModal = (doctor: DoctorModel) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteDoctor = async () => {
    if (doctorToDelete) {
      try {
        setLoading(true);
        await deleteDoctor(doctorToDelete.id);

        setDoctors((prevDoctors) =>
          prevDoctors.filter((doc) => doc.id !== doctorToDelete.id)
        );

        setFilteredDoctors((prevFiltered) =>
          prevFiltered.filter((doc) => doc.id !== doctorToDelete.id)
        );

        enqueueSnackbar("Doctor eliminado correctamente", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error eliminando el doctor:", error);

        enqueueSnackbar("Error al eliminar el doctor", {
          variant: "error",
        });
      } finally {
        setLoading(false);
        setIsDeleteModalOpen(false);
        setDoctorToDelete(null);
      }
    }
  };

  return (
    <main>
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-bold">Doctores</h1>
        <button
          className="bg-[--primary-color] text-white rounded-md p-2 px-8"
          onClick={handleNewDoctor}
        >
          Nuevo doctor
        </button>
      </section>
      <Input
        name="search"
        placeholder="Buscar doctor"
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <DoctorsTable
        doctors={filteredDoctors}
        onEditDoctor={(doc) => {
          setDoctor(doc);
          setIsDoctorsModalOpen(true);
        }}
        isLoading={isLoading}
        onDeleteDoctor={openDeleteModal}
      />

      <DeleteModalDoctor
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar doctor"
        message={`¿Estás seguro que deseas eliminar a ${doctorToDelete?.name}? Esta acción no se puede deshacer.`}
        onConfirm={confirmDeleteDoctor}
      />

      <DoctorsModal
        isOpen={isDoctorsModalOpen}
        onClose={() => setIsDoctorsModalOpen(false)}
        doctor={doctor}
        onSave={handleSaveDoctor}
      />
    </main>
  );
}
