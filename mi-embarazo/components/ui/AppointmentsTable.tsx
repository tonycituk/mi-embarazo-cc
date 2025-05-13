import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Badge from "./Badge";
import { DeleteRounded, Edit } from "@mui/icons-material";

import { DateTime } from "luxon";
import { AppointmentModel } from "@/src/models/AppointmentModel";

type AppointmentsTableProps = {
  appointments: AppointmentModel[];
  onEdit: (appointment: AppointmentModel) => void;
  onDelete: (appointment: AppointmentModel) => void;
  role: "doctor" | "admin"; // Agrega esta línea
  isLoading?: boolean;
};

const getTypeChipColor = (
  type: string
): { color: "warning" | "secondary" | "primary" } => {
  switch (type) {
    case "Nuevo paciente":
      return { color: "warning" };
    case "Virtual":
      return { color: "secondary" };
    default:
      return { color: "primary" };
  }
};

const getStatusChipColor = (
  status: string
): { color: "success" | "danger" | "primary" } => {
  switch (status) {
    case "Confirmada":
      return { color: "success" };
    case "Pendiente":
      return { color: "danger" };
    default:
      return { color: "primary" };
  }
};

export default function AppointmentsTable({
  appointments,
  onEdit,
  onDelete,
  role, // Added "role" prop to function arguments
  isLoading,
}: AppointmentsTableProps) {
  return (
    <TableContainer component={Paper} className="pt-6">
      <Table aria-label="appointments table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre del paciente</strong>
            </TableCell>
            <TableCell>
              <strong>No. Expediente</strong>
            </TableCell>
            <TableCell>
              <strong>Fecha de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Hora de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Tipo de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Estado</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7}>
                <LinearProgress
                  color="secondary"
                  sx={{
                    width: "76rem",
                    height: "0.5rem",
                    borderRadius: "0.25rem",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.patient_name}</TableCell>
                <TableCell>{appointment.record}</TableCell>
                <TableCell>
                  {DateTime.fromISO(appointment.date).toLocaleString(
                    DateTime.DATE_FULL
                  )}
                </TableCell>
                <TableCell>
                  {DateTime.fromFormat(
                    appointment.time,
                    "HH:mm"
                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                </TableCell>
                <TableCell>
                  <Badge type={getTypeChipColor(appointment.date_type).color}>
                    {appointment.date_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge type={getStatusChipColor(appointment.status).color}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <button
                      className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 hover:bg-yellow-600 hover:bg-opacity-25"
                      onClick={() => onEdit(appointment)}
                    >
                      <Edit />
                    </button>
                    {role === "admin" && ( // Conditional rendering for "Delete" button
                      <button
                        className="bg-red-100 px-2 py-1 rounded text-red-800 hover:bg-red-600 hover:bg-opacity-25"
                        onClick={() => onDelete(appointment)}
                      >
                        <DeleteRounded />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
