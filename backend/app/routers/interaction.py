from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
)
from app.services.interaction_service import create_interaction

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


@router.post(
    "/",
    response_model=InteractionResponse,
)
def create_new_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    return create_interaction(
        db,
        interaction.model_dump(),
    )