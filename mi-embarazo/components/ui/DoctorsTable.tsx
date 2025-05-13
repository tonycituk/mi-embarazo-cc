import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  LinearProgress,
  TableRow,
} from "@mui/material";
import { DeleteRounded, Edit } from "@mui/icons-material";
import { DoctorModel } from "@/src/models/DoctorModel";

type DoctorsTableProps = {
  doctors: DoctorModel[];
  isLoading?: boolean;
  onEditDoctor: (doctor: DoctorModel) => void;
  onDeleteDoctor: (doctor: DoctorModel) => void;
};

export default function DoctorsTable({
  doctors,
  isLoading,
  onEditDoctor,
  onDeleteDoctor,
}: DoctorsTableProps) {
  return (
    <TableContainer component={Paper} className="pt-6">
      <Table aria-label="doctors table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell>
              <strong>Especialidad</strong>
            </TableCell>
            <TableCell>
              <strong>Correo</strong>
            </TableCell>
            <TableCell>
              <strong>Teléfono</strong>
            </TableCell>
            <TableCell>
              <strong>Género</strong>
            </TableCell>
            <TableCell>
              <strong>Consultorio</strong>
            </TableCell>
            <TableCell>
              <strong>Cédula</strong>
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
          {doctors.map((doctor, index) => (
            <TableRow key={index}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>{doctor.gender}</TableCell>
              <TableCell>{doctor.office}</TableCell>
              <TableCell>{doctor.license}</TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <button
                    className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 hover:bg-yellow-600 hover:bg-opacity-25"
                    onClick={() => onEditDoctor(doctor)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="bg-red-100 px-2 py-1 rounded text-red-800 hover:bg-red-600 hover:bg-opacity-25"
                    onClick={() => onDeleteDoctor(doctor)}
                  >
                    <DeleteRounded />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>)}
      </Table>
    </TableContainer>
  );
}
