"use client";
import Image from "next/image";

import Card from "../Card";
import ControlPrenatalForm from "../../ControlPrenatalFrom";
import { TabPanelProps } from "./DetailsTab";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import DateNavigator from "@/components/DateNavigator";

export default function ControlPrenatalTab(props: TabPanelProps) {
  const {
    value,
    index,
    formData,
    updateData,
    isPatientLoading,
    appointments,
    setIsAppointmentDataChanged,
  } = props;

  const [date, setDate] = useState(
    formData.date ? DateTime.fromISO(formData.date) : DateTime.now()
  );
  useEffect(() => {
    if (appointments) {
      const currentAppointment = appointments.find(
        (appointment) => appointment.date === formData.date
      );
      if (currentAppointment) {
        setDate(DateTime.fromISO(currentAppointment.date));
      }
    }
  }, [formData.date, appointments]);

  const handleDateChange = (newDate: DateTime) => {
    setDate(newDate);
    const matchingAppointment = appointments?.find(
      (appointment) =>
        DateTime.fromISO(appointment.date).toISODate() === newDate.toISODate()
    );
    if (matchingAppointment) {
      updateData(matchingAppointment);
    }
  };

  return (
    <div
      className="flex-1"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Card>
          {formData._id ? (
            <>
              <DateNavigator
                date={date}
                appointments={appointments}
                onDateChange={(newDate) => {
                  handleDateChange(newDate);
                }}
                restrictedDateNavigation
                errorMessage="No hay registros para esta fecha."
              />

              <ControlPrenatalForm
                formData={formData}
                updateData={updateData}
                isEditable={false}
                setIsAppointmentDataChanged={setIsAppointmentDataChanged}
              />
            </>
          ) : (
            <div>
              {isPatientLoading && !formData._id ? (
                <ControlPrenatalForm
                  formData={formData}
                  updateData={updateData}
                  isEditable={false}
                  setIsAppointmentDataChanged={setIsAppointmentDataChanged}
                />
              ) : (
                <div className="text-center text-gray-500 mt-4 place-self-center">
                  <Image
                    src="/controlPrenatal-placeholder.svg"
                    alt="No hay datos"
                    width={350}
                    height={350}
                  />
                  <p className="text-center text-gray-500 mt-4">
                    No hay datos de control prenatal.
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
