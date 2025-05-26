"use client";

import Image from "next/image";
import Logo from "../../components/ui/Logo";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { t } from "i18next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError(t("login-page.validation.email-required"));
      return;
    }

    if (!emailRegex.test(email)) {
      setError(t("login-page.validation.email-invalid"));
      return;
    }

    if (password.length < 8) {
      setError(t("login-page.validation.password-length"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password).finally(); // Use login method from AuthContext
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || t("login-page.login-error-message"));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(t("login-page.login-error-message"));
      }
    }
  };

  return (
    <div className="h-screen">
      <article className="flex p-4 h-full space-x-8">
        <section className="relative w-1/2">
          <Image
            className="rounded-lg object-cover"
            src="/login.jpg"
            alt="Imagen de fondo"
            fill
          />
        </section>
        <section className="flex-1 flex flex-col">
          <Logo />
          <div className="px-14 flex-1 pt-40">
            <h1 className="text-3xl font-bold">{t("login-page.title")}</h1>
            <p className="text-gray-400 font-light pt-1">
              {t("login-page.subtitle")}
            </p>
            <form onSubmit={handleSubmit} noValidate className="pt-4">
              <section className="space-y-8">
                <div className="space-y-1">
                  <label className="font-medium" htmlFor="email">
                    {t("login-page.email-label")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("login-page.email-placeholder")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="p-2 border border-gray-200 rounded-md w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium" htmlFor="password">
                    {t("login-page.password-label")}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="*******"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="p-2 border border-gray-200 rounded-md w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[--primary-color] text-white rounded-md p-2 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? t("loading-status") : t("btn-login")}
                </button>
              </section>
            </form>

            {error && (
              <div className="text-red-500 mt-4">
                <p>{error}</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
