"use client";

import { DateTime } from "luxon";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useState } from "react";

interface DateNavigatorProps {
  date: DateTime;
  appointments?: { date: string }[];
  onDateChange: (date: DateTime) => void;
  restrictedDateNavigation?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
}

export default function DateNavigator({
  date,
  appointments = [],
  onDateChange,
  restrictedDateNavigation = false, // Default is false to allow unrestricted date navigation
  errorMessage,
  isDisabled,
}: DateNavigatorProps) {
  const [error, setError] = useState<string>("");

  const isFirstDate = () =>
    restrictedDateNavigation &&
    appointments.length > 0 &&
    DateTime.fromISO(appointments[0].date).toISODate() === date.toISODate();

  const isLastDate = () =>
    restrictedDateNavigation &&
    appointments.length > 0 &&
    DateTime.fromISO(appointments[appointments.length - 1].date).toISODate() ===
      date.toISODate();

  const handleDateNavigation = (step: number) => {
    if (restrictedDateNavigation) {
      const currentIndex = appointments.findIndex(
        (appointment) =>
          DateTime.fromISO(appointment.date).toISODate() === date.toISODate()
      );

      if (currentIndex >= 0) {
        const newIndex = currentIndex + step;
        if (newIndex >= 0 && newIndex < appointments.length) {
          const newDate = DateTime.fromISO(appointments[newIndex].date);
          onDateChange(newDate);
          setError("");
        }
      }
    } else {
      const newDate = date.plus({ days: step });
      onDateChange(newDate);
    }
  };

  const handleManualDateChange = (newValue: DateTime | null) => {
    if (newValue) {
      if (restrictedDateNavigation) {
        const matchingAppointment = appointments.find(
          (appointment) =>
            DateTime.fromISO(appointment.date).toISODate() ===
            newValue.toISODate()
        );
        if (matchingAppointment) {
          onDateChange(newValue);
          setError("");
        } else {
          setError(errorMessage || "No hay registros para esta fecha.");
          setTimeout(() => setError(""), 3000);
        }
      } else {
        onDateChange(newValue);
        setError("");
      }
    }
  };

  return (
    <div className="flex items-center">
      <button
        disabled={(restrictedDateNavigation && isFirstDate()) || isDisabled}
        className="text-gray-500 rounded-md border-l border-t border-b border-t-gray-300 border-b-gray-300 rounded-r-none border-l-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
        onClick={() => handleDateNavigation(-1)}
      >
        <ChevronLeftRounded />
      </button>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateField
          disabled={isDisabled}
          value={date}
          onChange={(newValue) => handleManualDateChange(newValue)}
        />
      </LocalizationProvider>
      <button
        disabled={(restrictedDateNavigation && isLastDate()) || isDisabled}
        className="text-gray-500 rounded-md border-r border-t border-b border-t-gray-300 border-b-gray-300 rounded-l-none border-r-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
        onClick={() => handleDateNavigation(1)}
      >
        <ChevronRightRounded />
      </button>
      {error && (
        <p className="text-red-500 text-xs font-bold text-center">{error}</p>
      )}
    </div>
  );
}
