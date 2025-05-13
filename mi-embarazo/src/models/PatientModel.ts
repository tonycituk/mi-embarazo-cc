export class PatientModel {
    _id?: string;
    record: string;
    name: string;
    personalData: PersonalData;
    current_phone: string;
    doctor_options: unknown[];
    schedule_options: unknown[];
    doctor: string;
    date: string;
    pregnancyData: PregnancyData;
    medicalHistory: MedicalHistory;
    last_appointment?: string;

    constructor(
        _id: string = '',
        record: string = '',
        name: string = '',
        personalData: PersonalData = new PersonalData('','','',0,'','','','','','','','','','',''),
        current_phone: string = '',
        doctor_options: unknown[] = [],
        schedule_options: unknown[] = [],
        doctor: string = '',
        date: string = '',
        pregnancyData: PregnancyData = new PregnancyData('','','',0,0,'','',''),
        medicalHistory: MedicalHistory = new MedicalHistory('','','',''),
        last_appointment: string = '',
    ) {
        this._id = _id;
        this.record = record;
        this.name = name;
        this.personalData = personalData;
        this.current_phone = current_phone;
        this.doctor_options = doctor_options;
        this.schedule_options = schedule_options;
        this.doctor = doctor;
        this.date = date;
        this.pregnancyData = pregnancyData;
        this.medicalHistory = medicalHistory;
        this.last_appointment = last_appointment;
    }
}

export class PersonalData {
    name: string;
    gender: string;
    phone: string;
    age: number;
    birthDate: string;
    email: string;
    password: string;
    curp: string;
    maritalStatus: string;
    occupation: string;
    address: string;
    street: string;
    municipality: string;
    locality: string;
    state: string;

    constructor(
        name: string,
        gender: string,
        phone: string,
        age: number,
        birthDate: string,
        email: string,
        password: string,
        curp: string,
        occupation: string,
        address: string,
        maritalStatus: string,
        street: string,
        municipality: string,
        locality: string,
        state: string
    ) {
        this.name= name;
        this.gender= gender;
        this.phone= phone;
        this.age= age;
        this.birthDate= birthDate;
        this.email= email;
        this.password= password;
        this.curp= curp;
        this.occupation= occupation;
        this.address= address;
        this.maritalStatus= maritalStatus;
        this.street= street;
        this.municipality= municipality;
        this.locality= locality;
        this.state= state;
    }
}

export class PregnancyData {
    lastMenstruation: string;
    dueDate : string;
    gestationStage : string;
    previousPregnancies : number;
    abortions : number;
    pregnancyType : string;
    complication : string;
    observations : string;

    constructor(
        lastMenstruation: string,
        dueDate : string,
        gestationStage : string,
        previousPregnancies : number,
        abortions : number,
        pregnancyType : string,
        complication : string,
        observations : string
    ) {
        this.lastMenstruation=lastMenstruation;
        this.dueDate =dueDate ;
        this.gestationStage =gestationStage ;
        this.previousPregnancies =previousPregnancies ;
        this.abortions =abortions ;
        this.pregnancyType =pregnancyType ;
        this.complication =complication ;
        this.observations =observations ;
    }
}

export class MedicalHistory{
    medicalConditions: string;
    gynecologicalHistory: string;
    allergies : string;
    familyHistory : string;

    constructor(
        medicalConditions: string,
        gynecologicalHistory: string,
        allergies : string,
        familyHistory : string
    ) {
        this.medicalConditions=medicalConditions;
        this.gynecologicalHistory=gynecologicalHistory;
        this.allergies =allergies ;
        this.familyHistory =familyHistory ;
    }
}