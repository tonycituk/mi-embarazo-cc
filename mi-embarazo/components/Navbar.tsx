"use client";

import Link from "next/link";
import Logo from "./ui/Logo";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "./ui/Avatar";
import {
  DateRangeRounded,
  FaceRounded,
  GroupsRounded,
  HomeRounded,
  LogoutRounded,
} from "@mui/icons-material";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Navbar({ role }: { role: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    _id: "",
  });

  useEffect(() => {
    setUserInformation(JSON.parse(localStorage.getItem("user_info") || "{}"));
  }, []);

  // Para el cierre de sesión :)
  const handleLogout = () => {
    deleteCookie("access_token", {
      path: "/",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <article className="flex items-center justify-between py-4">
          <Logo width={150} height={150} />
          <section className="flex items-center space-x-16">
            <Link
              href={`/${role}/dashboard`}
              className={`${
                pathname === `/${role}/dashboard`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1 `}
            >
              <HomeRounded />
              Inicio
            </Link>
            {role === "admin" && (
              <Link
                href={`/admin/doctores`}
                className={`${
                  pathname === `/admin/doctores`
                    ? "text-[--primary-color] font-bold"
                    : "text-gray-400 hover:text-gray-500"
                } flex gap-x-1`}
              >
                <FaceRounded />
                Doctores
              </Link>
            )}
            <Link
              href={`/${role}/citas`}
              className={`${
                pathname === `/${role}/citas`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1`}
            >
              <DateRangeRounded />
              Citas
            </Link>
            <Link
              href={`/${role}/pacientes`}
              className={`${
                pathname === `/${role}/pacientes`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1`}
            >
              <GroupsRounded />
              Pacientes
            </Link>
          </section>
          <div className="flex items-center space-x-14">
            <Link
              className="flex items-center space-x-2"
              href={`/${role}/perfil`}
            >
              <Avatar name={userInformation.name} />
              <span className="font-medium"> {userInformation.name} </span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex font-bold text-[--primary-color] hover:text-[--primary-color-dark]"
            >
              <LogoutRounded />
              Cerrar sesión
            </button>
          </div>
        </article>
      </div>
    </nav>
  );
}
