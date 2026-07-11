from fastapi import APIRouter
from sqlalchemy import or_

from app.database import SessionLocal
from app.models.hcp import HCP
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/search",
    tags=["Global Search"],
)


@router.get("/")
def global_search(q: str):

    db = SessionLocal()

    doctors = (
        db.query(HCP)
        .filter(
            or_(
                HCP.doctor_name.ilike(f"%{q}%"),
                HCP.hospital.ilike(f"%{q}%"),
                HCP.phone.ilike(f"%{q}%"),
            )
        )
        .limit(5)
        .all()
    )

    interactions = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.hcp_name.ilike(f"%{q}%"),
                Interaction.hospital.ilike(f"%{q}%"),
                Interaction.products.ilike(f"%{q}%"),
                Interaction.summary.ilike(f"%{q}%"),
            )
        )
        .limit(5)
        .all()
    )

    db.close()

    return {
    "doctors": [
        {
            "id": d.id,
            "doctor_name": d.doctor_name,
            "hospital": d.hospital,
        }
        for d in doctors
    ],
    "interactions": [
        {
            "id": i.id,
            "hcp_name": i.hcp_name,
            "summary": i.summary,
        }
        for i in interactions
    ],
}