from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_name: str
    hospital: Optional[str] = None
    speciality: Optional[str] = None
    interaction_type: Optional[str] = None
    products: Optional[str] = None
    notes: Optional[str] = None
    summary: Optional[str] = None
    follow_up_date: Optional[date] = None


class InteractionResponse(InteractionCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True