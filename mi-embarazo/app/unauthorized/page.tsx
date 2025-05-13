"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    const role = JSON.parse(localStorage.getItem("user_info") || "{}").role;

    if (role === "admin" || role === "doctor") {
      router.push(`/${role}/dashboard`);
    } else {
      window.location.href = "/";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          ¡Uay! Parece que te perdiste
        </h2>
        <p className="mt-2 text-gray-600">
          No tienes permisos para acceder a esta página.
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoBack}
            className="bg-[--primary-color] text-white rounded-md p-2 w-full"
          >
            Regresar al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
