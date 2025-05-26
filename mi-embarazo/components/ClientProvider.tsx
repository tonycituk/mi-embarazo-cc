"use client";

import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../context/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../app/i18n";
import { useEffect, useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;
  return (
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </I18nextProvider>
  );
}
