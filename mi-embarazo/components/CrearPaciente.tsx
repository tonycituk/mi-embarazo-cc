"use client";

import { Tab, Tabs, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailsTab from "./ui/PatientRecordTabs/DetailsTab";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPatient } from "@/src/services/pacienteService";
import { PatientModel } from "@/src/models/PatientModel";
import { DoctorModel } from "@/src/models/DoctorModel";
import { fetchDoctors } from "@/src/services/adminDoctoresService";

export default function CrearPaciente() {
  const pathname = usePathname();
  const router = useRouter();
  const role = pathname.split("/")[1];
  const [doctorId, setDoctorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(false);
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);

  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());

  const fetchDoctorsAdmin = async () => {
    try {
      setIsFetchingDoctors(true);
      const fetchedDoctors = await fetchDoctors();
      setDoctors(fetchedDoctors);

      if (fetchedDoctors.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          doctor: fetchedDoctors[0].id,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingDoctors(false);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchDoctorsAdmin();
    }
    if (role === "doctor") {
      setDoctorId(JSON.parse(localStorage.getItem("user_info")!)._id);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      doctor: e.target.value,
    }));
  };

  const savePatient = async () => {
    try {
      setIsLoading(true);
      formData.record = `EXP-${Math.floor(Math.random() * 1000000)}`;

      if (role == "doctor") {
        formData.doctor = doctorId;
      }

      const formDataWithoutId = { ...formData };
      delete formDataWithoutId._id;

      await createPatient(formDataWithoutId).finally(() => {
        setFormData(new PatientModel()); // Clear form
        router.push(`/${role}/pacientes`);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };
  //TODO: finish selecting doctor as admin
  return (
    <div>
      <section className="flex justify-between items-center">
        {role === "admin" && (
          <div className="flex flex-col">
            <label
              className="text-[#8b8b8b] text-sm font-bold pl-2"
              htmlFor="doctors"
            >
              Asignar doctor
            </label>
            <select
              required
              value={formData.doctor}
              onChange={handleChange}
              className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[--primary-color]"
              name="doctors"
              disabled={isFetchingDoctors}
            >
              <option hidden={doctors.length > 0} value="">
                Cargando doctores...
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex gap-4">
          <Link href={`/${role}/pacientes`} passHref>
            <Button variant="outlined" color="secondary" disabled={isLoading}>
              Cancelar
            </Button>
          </Link>
          <Button
            onClick={savePatient}
            variant="contained"
            color="secondary"
            disabled={isLoading || isFetchingDoctors}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </section>
      <Tabs
        value={tab}
        textColor="secondary"
        indicatorColor="secondary"
        className="mb-6"
        onChange={(e, newValue) => setTab(newValue)}
      >
        <Tab value={0} label="Detalles" />
        {/* <Tab value={1} label="Historial" /> */}
      </Tabs>
      <DetailsTab
        value={tab}
        index={0}
        isEditing
        formData={formData}
        updateData={(data: PatientModel) => {
          setFormData((prevData) => ({
            ...prevData,
            personalData: { ...prevData.personalData, ...data },
            pregnancyData: { ...prevData.pregnancyData, ...data },
          }));
        }}
      />

      {/* <ControlPrenatalTab
        value={tab}
        index={1}
        isEditing
        formData={formData.prenatalControl[0]}
        updateData={(data) => updateFormData("prenatalControl", [data])}
      /> */}
    </div>
  );
}
