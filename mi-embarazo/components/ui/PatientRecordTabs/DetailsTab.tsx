import Input from "../Input";
import Card from "../Card";
import TextField from "../TextField";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";

export interface TabPanelProps {
  index: number;
  value: number;
  formData: any;
  updateData: any;
  isPatientLoading?: boolean;
  isEditing?: boolean;
  isLoading?: boolean;
  appointments?: AppointmentDetailsModel[];
  setIsAppointmentDataChanged?: any;
}

export default function DetailsTab(props: TabPanelProps) {
  const { updateData, formData, isEditing, isLoading, value, index, ...other } =
    props;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes("personalData")) {
      updateData({ personalData: { [name]: value } });
    } else if (name.includes("pregnancyData")) {
      updateData({ pregnancyData: { [name]: value } });
    } else if (name.includes("medicalHistory")) {
      updateData({ medicalHistory: { [name]: value } });
    } else {
      updateData({ [name]: value });
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <Card title="Información personal">
            <section className="grid grid-cols-2 gap-4 ">
              <Input
                name="name"
                label="Nombre"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData.name}
              />
              <Input
                name="maritalStatus"
                label="Estado civil"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.maritalStatus}
              />
              <Input
                name="gender"
                label="Género"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.gender}
              />
              <Input
                name="occupation"
                label="Ocupación"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.occupation}
              />
              <Input
                name="phone"
                label="Teléfono"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.phone}
              />
              <Input
                name="address"
                label="Dirección"
                type="text"
                disabled={!isEditing || isLoading}
                className="row-span-2"
                onChange={handleChange}
                value={formData?.personalData?.address}
              />
              <Input
                name="age"
                label="Edad"
                type="number"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.age}
              />
              <Input
                name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.birthDate}
              />
              <Input
                name="municipality"
                label="Municipio"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.municipality}
              />
              <Input
                name="locality"
                label="Localidad"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.locality}
              />
              <Input
                name="state"
                label="Estado"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.state}
              />
              <Input
                name="email"
                label="Correo electrónico"
                type="email"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.email}
              />
              <Input
                name="curp"
                label="CURP"
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.curp}
              />
            </section>
          </Card>

          <Card title="Datos del embarazo">
            <section className="grid grid-cols-2 gap-4">
              <Input
                name="lastMenstruation"
                label="Fecha de última menstruación"
                type="date"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.lastMenstruation}
                onChange={handleChange}
              />
              <Input
                name="dueDate"
                label="Fecha probable de parto"
                type="date"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.dueDate}
                onChange={handleChange}
              />
              <Input
                name="gestationStage"
                label="Edad gestacional (semana)"
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.gestationStage}
                onChange={handleChange}
              />
              <Input
                name="previousPregnancies"
                label="Número de embarazo"
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.previousPregnancies}
                onChange={handleChange}
              />
              <Input
                name="abortions"
                label="Número de abortos"
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.abortions}
                onChange={handleChange}
              />
              <Input
                name="pregnancyType"
                label="Tipo de embarazo"
                type="text"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.pregnancyType}
                onChange={handleChange}
              />
              <TextField
                name="complication"
                label="Complicaciones"
                className="col-span-2"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.complication}
                onChange={handleChange}
              />
              <TextField
                name="observations"
                label="Observaciones"
                className="col-span-2"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.observations}
                onChange={handleChange}
              />
            </section>
          </Card>

          <Card title="Antecedentes médicos" className="col-span-2">
            <section className="gap-4">
              <TextField
                name="medicalConditions"
                label="Condiciones médicas"
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.medicalConditions}
                onChange={handleChange}
              />
              <TextField
                name="gynecologicalHistory"
                label="Historia ginecológica"
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.gynecologicalHistory}
                onChange={handleChange}
              />
              <TextField
                name="allergies"
                label="Alergias"
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.allergies}
                onChange={handleChange}
              />
              <TextField
                name="familyHistory"
                label="Historial Familiar"
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.familyHistory}
                onChange={handleChange}
              />
            </section>
          </Card>
        </article>
      )}
    </div>
  );
}
