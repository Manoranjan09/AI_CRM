from pydantic import BaseModel
from typing import Optional


class HCPCreate(BaseModel):

    doctor_name: str

    speciality: Optional[str] = None

    hospital: Optional[str] = None

    city: Optional[str] = None

    phone: Optional[str] = None

    email: Optional[str] = None


class HCPResponse(HCPCreate):

    id: int

    class Config:
        from_attributes = True