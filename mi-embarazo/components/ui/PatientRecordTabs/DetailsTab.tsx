import Input from "../Input";
import Card from "../Card";
import TextField from "../TextField";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { t } from "i18next";

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
          <Card title={t("patients.details-tab-info.personal-info.title")}>
            <section className="grid grid-cols-2 gap-4 ">
              <Input
                name="name"
                label={t("patients.details-tab-info.personal-info.name")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData.name}
              />
              <Input
                name="maritalStatus"
                label={t(
                  "patients.details-tab-info.personal-info.marital-status"
                )}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.maritalStatus}
              />
              <Input
                name="gender"
                label={t("patients.details-tab-info.personal-info.gender")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.gender}
              />
              <Input
                name="occupation"
                label={t("patients.details-tab-info.personal-info.occupation")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.occupation}
              />
              <Input
                name="phone"
                label={t("patients.details-tab-info.personal-info.phone")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.phone}
              />
              <Input
                name="address"
                label={t("patients.details-tab-info.personal-info.address")}
                type="text"
                disabled={!isEditing || isLoading}
                className="row-span-2"
                onChange={handleChange}
                value={formData?.personalData?.address}
              />
              <Input
                name="age"
                label={t("patients.details-tab-info.personal-info.age")}
                type="number"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.age}
              />
              <Input
                name="birthDate"
                label={t("patients.details-tab-info.personal-info.birthdate")}
                type="date"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.birthDate}
              />
              <Input
                name="municipality"
                label={t(
                  "patients.details-tab-info.personal-info.municipality"
                )}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.municipality}
              />
              <Input
                name="locality"
                label={t("patients.details-tab-info.personal-info.locality")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.locality}
              />
              <Input
                name="state"
                label={t("patients.details-tab-info.personal-info.state")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.state}
              />
              <Input
                name="email"
                label={t("patients.details-tab-info.personal-info.email")}
                type="email"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.email}
              />
              <Input
                name="curp"
                label={t("patients.details-tab-info.personal-info.curp")}
                type="text"
                disabled={!isEditing || isLoading}
                onChange={handleChange}
                value={formData?.personalData?.curp}
              />
            </section>
          </Card>

          <Card title={t("patients.details-tab-info.pregnancy-info.title")}>
            <section className="grid grid-cols-2 gap-4">
              <Input
                name="lastMenstruation"
                label={t(
                  "patients.details-tab-info.pregnancy-info.last-menstrual-period"
                )}
                type="date"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.lastMenstruation}
                onChange={handleChange}
              />
              <Input
                name="dueDate"
                label={t(
                  "patients.details-tab-info.pregnancy-info.estimated-due-date"
                )}
                type="date"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.dueDate}
                onChange={handleChange}
              />
              <Input
                name="gestationStage"
                label={t(
                  "patients.details-tab-info.pregnancy-info.gestational-stage"
                )}
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.gestationStage}
                onChange={handleChange}
              />
              <Input
                name="previousPregnancies"
                label={t(
                  "patients.details-tab-info.pregnancy-info.current-pregnancy-number"
                )}
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.previousPregnancies}
                onChange={handleChange}
              />
              <Input
                name="abortions"
                label={t("patients.details-tab-info.pregnancy-info.abortions")}
                type="number"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.abortions}
                onChange={handleChange}
              />
              <Input
                name="pregnancyType"
                label={t(
                  "patients.details-tab-info.pregnancy-info.pregnancy-type"
                )}
                type="text"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.pregnancyType}
                onChange={handleChange}
              />
              <TextField
                name="complication"
                label={t(
                  "patients.details-tab-info.pregnancy-info.complications"
                )}
                className="col-span-2"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.complication}
                onChange={handleChange}
              />
              <TextField
                name="observations"
                label={t(
                  "patients.details-tab-info.pregnancy-info.observations"
                )}
                className="col-span-2"
                disabled={!isEditing || isLoading}
                value={formData?.pregnancyData?.observations}
                onChange={handleChange}
              />
            </section>
          </Card>

          <Card
            title={t("patients.details-tab-info.medical-history.title")}
            className="col-span-2"
          >
            <section className="gap-4">
              <TextField
                name="medicalConditions"
                label={t(
                  "patients.details-tab-info.medical-history.medical-conditions"
                )}
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.medicalConditions}
                onChange={handleChange}
              />
              <TextField
                name="gynecologicalHistory"
                label={t(
                  "patients.details-tab-info.medical-history.gynecological-history"
                )}
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.gynecologicalHistory}
                onChange={handleChange}
              />
              <TextField
                name="allergies"
                label={t("patients.details-tab-info.medical-history.allergies")}
                disabled={!isEditing || isLoading}
                value={formData?.medicalHistory?.allergies}
                onChange={handleChange}
              />
              <TextField
                name="familyHistory"
                label={t(
                  "patients.details-tab-info.medical-history.family-history"
                )}
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
