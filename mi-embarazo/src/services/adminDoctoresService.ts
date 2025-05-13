import { DoctorModel } from "../models/DoctorModel";
import { getHeaders } from "./apiConfig";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener la lista de doctores
export async function fetchDoctors(): Promise<DoctorModel[]> {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/doctors`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching doctors");
  }

  const data = await response.json();
  return data.map(
    (doctor: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
      new DoctorModel(
        doctor._id,
        doctor.name,
        doctor.specialization,
        doctor.email,
        doctor.phone,
        doctor.gender,
        doctor.office,
        doctor.license
      )
  );
}

// Crear un nuevo doctor
export async function addDoctor(doctor: DoctorModel): Promise<DoctorModel> {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...doctor, role: "doctor" }), // Añadimos el rol doctor
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Error creating doctor");
  }

  const data = await response.json();
  return new DoctorModel(
    data.user_id, // El backend devuelve "user_id" para el ID
    data.user_name,
    doctor.specialization,
    data.user_email,
    doctor.phone,
    doctor.gender,
    doctor.office,
    doctor.license
  );
}

// Actualizar un doctor
export async function updateDoctor(id: string, doctor: DoctorModel): Promise<DoctorModel> {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });

  if (!response.ok) {
    throw new Error("Error updating doctor");
  }

  const data = await response.json();
  return new DoctorModel(
    data._id,
    data.name,
    data.specialization,
    data.email,
    data.phone,
    data.gender,
    data.office,
    data.license
  );
}

// Eliminar un doctor
export async function deleteDoctor(id: string): Promise<void> {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting doctor");
  }
}

export async function getDoctorById(id: string) {
  const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Error fetching doctor");
  }

  const data: DoctorModel = await response.json();
  return data;
}