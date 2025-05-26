"use client";

import { useState, useEffect } from "react";
import CitasPage from "../../../components/CitasPage";
import Card from "../../../components/ui/Card";
import { fetchDashboardCounts } from "@/src/services/adminDashboardService";
import {
  CalendarTodayRounded,
  FaceRounded,
  GroupRounded,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { useTranslation, withTranslation } from "react-i18next";

function DashboardPage() {
  const [name, setName] = useState("");
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
  });
  const { t } = useTranslation();

  const loadCounts = async () => {
    try {
      const data = await fetchDashboardCounts().finally(() =>
        setIsLoadingCounts(false)
      );
      setCounts(data);
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem("user_info") || "{}").name);
    loadCounts();
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold">
        {t("doctors.dashboard-welcome-title")} {name},
      </h1>
      <p className="text-gray-400 font-light pt-1">
        {t("doctors.dashboard-welcome-subtitle")}
      </p>
      <section className="flex gap-4 my-6">
        {isLoadingCounts ? (
          <>
            <Skeleton variant="rounded" width={400} height={300} />
            <Skeleton variant="rounded" width={400} height={300} />
            <Skeleton variant="rounded" width={400} height={300} />
          </>
        ) : (
          <>
            <Card className="flex-1 py-10">
              <div className="flex justify-between items-center">
                <div>
                  <small className="font-semibold">
                    {t("doctors.dashboard-doctors-title")}
                  </small>
                  <h2 className="text-5xl font-bold text-black">
                    {counts.doctors}
                  </h2>
                </div>
                <FaceRounded className="text-[--primary-color] text-6xl" />
              </div>
            </Card>
            <>
              <Card className="flex-1 py-10">
                <div className="flex justify-between items-center">
                  <div>
                    <small className="font-semibold">
                      {t("doctors.dashboard-patients-title")}
                    </small>
                    <h2 className="text-5xl font-bold text-black">
                      {counts.patients}
                    </h2>
                  </div>
                  <GroupRounded className="text-[--primary-color] text-6xl" />
                </div>
              </Card>
              <Card className="flex-1 py-10">
                <div className="flex justify-between items-center">
                  <div>
                    <small className="font-semibold">
                      {t("doctors.dashboard-appointments-title")}
                    </small>
                    <h2 className="text-5xl font-bold text-black">
                      {counts.appointments}
                    </h2>
                  </div>
                  <CalendarTodayRounded className="text-[--primary-color] text-6xl" />
                </div>
              </Card>
            </>
          </>
        )}
      </section>
      <CitasPage role="admin" />
    </main>
  );
}

export default withTranslation()(DashboardPage);
