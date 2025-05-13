"use client";

import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.role !== "doctor") {
    router.push("/unauthorized");
    return null;
  }

  return (
    <>
      <Navbar role="doctor" />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
