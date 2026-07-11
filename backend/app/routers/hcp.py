from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.hcp import HCPCreate, HCPResponse
from app.services.hcp_service import (
    create_hcp,
    get_hcps,
    update_hcp,
    delete_hcp,
)

router = APIRouter(
    prefix="/hcp",
    tags=["HCP"],
)


@router.post("/", response_model=HCPResponse)
def add_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db),
):

    return create_hcp(db, hcp)


@router.get("/", response_model=list[HCPResponse])
def list_hcps(
    db: Session = Depends(get_db),
):

    return get_hcps(db)


@router.put("/{hcp_id}", response_model=HCPResponse)
def edit_hcp(
    hcp_id: int,
    hcp: HCPCreate,
    db: Session = Depends(get_db),
):

    updated = update_hcp(
        db,
        hcp_id,
        hcp,
    )

    if updated is None:

        raise HTTPException(404, "Doctor not found")

    return updated


@router.delete("/{hcp_id}")
def remove_hcp(
    hcp_id: int,
    db: Session = Depends(get_db),
):

    deleted = delete_hcp(
        db,
        hcp_id,
    )

    if deleted is None:

        raise HTTPException(404, "Doctor not found")

    return {
        "message": "Doctor deleted successfully."
    }