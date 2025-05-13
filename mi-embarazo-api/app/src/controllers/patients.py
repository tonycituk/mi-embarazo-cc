from fastapi import APIRouter, Body, status, HTTPException, Depends

from models.pyObjectId import PyObjectId
from services.patients_service import PatientsService
from models.user_model import UserModel
from models.patient import Patient
from utils.login_required import login_required

patients_router = APIRouter(
    prefix="/patients",
    tags=["patients"],
    dependencies=[
        Depends(
            login_required
        )
    ]
)

@patients_router.get("")
def get_patients() -> list[Patient]:
    patients: list[Patient] = PatientsService().get_patients()
    return patients


@patients_router.get("/doctors")
def get_patients_by_doctor(credentials : UserModel = Depends(login_required)) -> list[Patient]:
    patients: list[Patient] | None = PatientsService().get_patients_by_doctor(credentials.id)

    return patients

@patients_router.get("/{patient_id}")
def get_patient(patient_id: str) -> Patient:
    patient: Patient | None = PatientsService().get_patient(patient_id)

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient


@patients_router.post("", status_code=status.HTTP_201_CREATED)
def create_patient(patient: Patient) -> dict:
    created_patient: dict = PatientsService().create_patient(patient)
    return created_patient


@patients_router.put("/{patient_id}", status_code=status.HTTP_200_OK)
def update_patient(patient_id: str, patient: Patient) -> dict:
    response: dict | None = PatientsService().update_patient(patient_id, patient)

    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return response


@patients_router.delete("/{patient_id}", status_code=status.HTTP_200_OK)
def delete_patient(patient_id: str) -> dict:
    patient: dict | None = PatientsService().delete_patient(patient_id)

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient

@patients_router.put("/{patient_id}/appointments", status_code=status.HTTP_200_OK)
def save_last_appointment(patient_id: str, request: dict = Body(...)) -> dict:
    appointment_id = request.get("appointment_id")
    appointment_date = request.get("appointment_date")

    if not appointment_id or not appointment_date:
        raise HTTPException(status_code=422, detail="Missing required fields: appointment_id or appointment_date")

    response: dict | None = PatientsService().save_last_appointment(
        patient_id,
        appointment_id,
        appointment_date
    )
    return response