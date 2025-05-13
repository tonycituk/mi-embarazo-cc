"use client";

import { useState } from "react";
import Logo from "../../components/ui/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Formulario enviado");
  };

  return (
    <main className="h-screen">
      <article className="h-full place-items-center content-center space-y-8 pb-24">
        <Logo type="pictorial" width={140} height={140} />
        <section className="w-1/2">
          <h1 className="text-3xl font-bold text-center">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-400 font-light text-center">
            Ingresa el correo con el que te registraste en el sistema. Si
            coincide en la base de datos, te mandaremos el procedimiento para
            reinicializarla.
          </p>
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="space-y-8">
              <div className="space-y-1">
                <label className="font-medium" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="p-2 border border-gray-200 rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-[--primary-color] text-white rounded-md p-2 w-full"
              >
                Enviar
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}
