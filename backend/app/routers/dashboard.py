from fastapi import APIRouter
from sqlalchemy import func
from datetime import date

from app.database import SessionLocal
from app.models.hcp import HCP
from app.models.interaction import Interaction

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def dashboard_stats():
    db = SessionLocal()

    total_hcps = db.query(HCP).count()

    total_interactions = db.query(Interaction).count()

    upcoming_followups = (
        db.query(Interaction)
        .filter(
            Interaction.follow_up_date != None,
            Interaction.follow_up_date >= date.today(),
        )
        .count()
    )

    today_interactions = (
        db.query(Interaction)
        .filter(func.date(Interaction.created_at) == date.today())
        .count()
    )

    db.close()

    return {
        "total_hcps": total_hcps,
        "total_interactions": total_interactions,
        "upcoming_followups": upcoming_followups,
        "today_interactions": today_interactions,
    }


@router.get("/recent-interactions")
def recent_interactions():
    db = SessionLocal()

    interactions = (
        db.query(Interaction)
        .order_by(Interaction.created_at.desc())
        .limit(5)
        .all()
    )

    data = []

    for interaction in interactions:
        data.append(
            {
                "id": interaction.id,
                "hcp_name": interaction.hcp_name,
                "hospital": interaction.hospital,
                "summary": interaction.summary,
                "created_at": interaction.created_at,
            }
        )

    db.close()

    return data