"use client";

import React, { useEffect, useState } from "react";
import Avatar from "./ui/Avatar";
import Input from "./ui/Input";
import { updateProfile, verifyPassword } from "@/src/services/perfilService";

export default function ProfilePage({ role }: { role: string }) {
  const [isEditing, setIsEditing] = useState(false); // Toggle editing
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isVerifying, setIsVerifying] = useState(false);

  // Make sure all initial values are defined
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    currentPassword: "", // New field
    newPassword: "",
    confirmPassword: "",
    role: role || "", // Default to provided role or empty string
  });

  useEffect(() => {
    const loadProfile = async () => {
      const user_info = JSON.parse(localStorage.getItem("user_info") || "{}");
      setFormData((prev) => ({
        ...prev,
        ...user_info,
        // Ensure fields like currentPassword, newPassword, etc. always have initial values
        currentPassword: user_info.currentPassword || "",
        newPassword: user_info.newPassword || "",
        confirmPassword: user_info.confirmPassword || "",
      }));
    };

    loadProfile();
  }, []);

  // Generic input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyCurrentPassword = async () => {
    try {
      const response: any = await verifyPassword(
        formData.email,
        formData.currentPassword
      );
      return response.message;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = "El nombre es obligatorio.";
    if (!formData.email) errors.email = "El correo es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Correo inválido.";
    // Validate password changes
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        errors.currentPassword =
          "La contraseña actual es obligatoria para cambiar la contraseña.";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden.";
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormErrors({}); // Clear previous errors
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsVerifying(true);

    if (formData.newPassword) {
      const passwordCorrect = await verifyCurrentPassword();
      if (!passwordCorrect) {
        setFormErrors({ currentPassword: "Contraseña incorrecta" });
        setIsVerifying(false);
        return;
      }
    }

    localStorage.setItem("user_info", JSON.stringify(formData));

    try {
      await updateProfile(formData as any);
      setIsEditing(false); // Exit edit mode
      alert("Cambios guardados con éxito.");
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("Error al guardar los cambios.");
    }

    setIsVerifying(false);
    setIsEditing(false);
    formErrors.currentPassword = "";
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6 flex items-center gap-4">
        <Avatar
          className="w-24 h-24"
          textSize="xl"
          name={formData.name || "U"}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mi perfil</h1>
          <p className="text-gray-500 mt-2">
            Administra tu información personal y datos de la cuenta.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Detalles de la cuenta
        </h2>
        <div className="space-y-4">
          {/* Name */}
          <Input
            label="Nombre"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={formErrors.name}
          />
          {/* Email and Phone */}
          <div className="flex justify-between gap-4">
            <Input
              label="Correo"
              name="email"
              type="email"
              className="flex-1"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={formErrors.email}
            />
            <Input
              label="Teléfono"
              name="phone"
              type="text"
              className="flex-1"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {/* Passwords */}
          {isEditing && (
            <>
              <Input
                label="Actual contraseña"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                error={formErrors.currentPassword}
              />
              <div className="flex gap-4">
                <Input
                  label="Nueva contraseña"
                  name="newPassword"
                  type="password"
                  className="flex-1"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <Input
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                  className="flex-1"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                />
              </div>
            </>
          )}
          {/* Role (Admin Only) */}
          {role === "admin" && (
            <div>
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="role"
              >
                Rol
              </label>
              {isEditing ? (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-200 rounded-md w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                </select>
              ) : (
                <p className="text-gray-800 p-2 w-2/3 capitalize">
                  {formData.role}
                </p>
              )}
            </div>
          )}
        </div>

        <footer className="pt-6 flex gap-4">
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-[--primary-color] text-white rounded-md p-2 w-full transition"
            >
              Editar
            </button>
          )}

          {isEditing && (
            <>
              <button
                type="submit" // Submit form for saving changes
                disabled={isVerifying}
                className="flex-1 bg-[--primary-color] text-white rounded-md p-2 w-full transition"
              >
                {isVerifying ? "Verificando..." : "Guardar"}
              </button>
              <button
                type="button" // Only toggle edit mode
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-red-100 text-red-700 rounded-md p-2 w-full hover:bg-red-200 transition"
              >
                Cancelar
              </button>
            </>
          )}
        </footer>
      </form>
    </main>
  );
}
