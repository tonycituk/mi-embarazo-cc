export class AppointmentModel {
  _id: string;
  patient: unknown;
  patient_name: string;
  record: string;
  doctor: string;
  file: string | object;
  date: string;
  time: string;
  date_type: string; 
  status: string;
  weight: GLfloat;
  bloodPressure: string;
  fetalHeartRate: string;
  fetalStatus: string;
  observations: string;
  prescription: string;

  constructor(
    _id: string,
    patient: unknown,
    patient_name: string,
    record: string,
    doctor: string,
    file: string | object,
    date: string,
    time: string,
    date_type: string, 
    status: string,
    weight: GLfloat,
    bloodPressure: string,
    fetalHeartRate: string,
    fetalStatus: string,
    observations: string,
    prescription: string,
  ) {
    this._id = _id;
    this.patient = patient;
    this.patient_name = patient_name;
    this.record = record;
    this.doctor = doctor;
    this.file = file;
    this.date = date;
    this.time = time;
    this.date_type = date_type;
    this.status = status;
    this.weight = weight;
    this.bloodPressure = bloodPressure;
    this.fetalHeartRate = fetalHeartRate;
    this.fetalStatus = fetalStatus;
    this.observations = observations;
    this.prescription = prescription;
  }
}

export class AppointmentDetailsModel{
  _id: unknown;
  patient: unknown;
  patient_name: string;
  record: string;
  doctor: string;
  file: string | object;
  date: string;
  time: string;
  date_type: string; 
  status: string;
  weight: GLfloat;
  bloodPressure: string;
  fetalHeartRate: string;
  fetalStatus: string;
  observations: string;
  prescription: string;

  constructor(
    _id: unknown,
    patient: unknown,
    patient_name: string,
    record: string,
    doctor: string,
    file: string | object,
    date: string,
    time: string,
    date_type: string, 
    status: string,
    weight: GLfloat,
    bloodPressure: string,
    fetalHeartRate: string,
    fetalStatus: string,
    observations: string,
    prescription: string,
  ) {
    this._id = _id;
    this.patient = patient;
    this.patient_name = patient_name;
    this.record = record;
    this.doctor = doctor;
    this.file = file;
    this.date = date;
    this.time = time;
    this.date_type = date_type;
    this.status = status;
    this.weight = weight;
    this.bloodPressure = bloodPressure;
    this.fetalHeartRate = fetalHeartRate;
    this.fetalStatus = fetalStatus;
    this.observations = observations;
    this.prescription = prescription;
  }
}