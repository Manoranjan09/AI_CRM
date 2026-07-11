from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.interaction import Interaction
from app.models.hcp import HCP

import re


def create_interaction(db: Session, data: dict):

    interaction = Interaction(
        hcp_name=data.get("hcp_name"),
        hospital=data.get("hospital"),
        speciality=data.get("speciality"),
        interaction_type=data.get("interaction_type"),
        products=data.get("products"),
        notes=data.get("notes"),
        summary=data.get("summary"),
        follow_up_date=data.get("follow_up_date"),
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction


def normalize_name(name: str) -> str:
    """
    Normalize doctor names for flexible matching.

    Examples:
        Dr Yash Raj
        Dr. Yash Raj
        dr yash raj

    ↓

        yash raj
    """

    if not name:
        return ""

    name = name.lower().strip()

    # Remove Dr / Dr.
    name = re.sub(r"^dr\.?\s+", "", name)

    # Remove multiple spaces
    name = re.sub(r"\s+", " ", name)

    return name


def rename_doctor_everywhere(
    db: Session,
    old_name: str,
    new_name: str,
):
    """
    Update doctor's name in both HCP table and
    every Interaction record.

    This keeps the HCP Directory and Interaction
    history synchronized.
    """

    old_normalized = normalize_name(old_name)

    # -----------------------------
    # Update HCP Directory
    # -----------------------------
    hcps = db.query(HCP).all()

    for hcp in hcps:

        if normalize_name(hcp.doctor_name) == old_normalized:
            hcp.doctor_name = new_name

    # -----------------------------
    # Update ALL Interactions
    # -----------------------------
    interactions = db.query(Interaction).all()

    for interaction in interactions:

        if normalize_name(interaction.hcp_name) == old_normalized:
            interaction.hcp_name = new_name


def update_interaction(
    db: Session,
    hcp_name: str,
    updates: dict,
):

    normalized = normalize_name(hcp_name)

    interactions = (
        db.query(Interaction)
        .order_by(Interaction.id.desc())
        .all()
    )

    interaction = None

    for item in interactions:

        db_name = normalize_name(item.hcp_name)

        # Exact Match
        if db_name == normalized:
            interaction = item
            break

        # Partial Match
        if normalized in db_name:
            interaction = item
            break

    if interaction is None:
        return None

    # -----------------------------
    # Rename Doctor Everywhere
    # -----------------------------
    if "hcp_name" in updates:

        new_name = updates.get("hcp_name")

        if new_name and new_name.strip():

            rename_doctor_everywhere(
                db=db,
                old_name=interaction.hcp_name,
                new_name=new_name.strip(),
            )

    # -----------------------------
    # Update Remaining Fields
    # -----------------------------
    for key, value in updates.items():

        if key == "hcp_name":
            continue

        if value is None or value == "":
            continue

        if hasattr(interaction, key):
            setattr(interaction, key, value)

    db.commit()
    db.refresh(interaction)

    return interaction


def search_interactions(
    db: Session,
    query: str,
):

    results = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.hcp_name.ilike(f"%{query}%"),
                Interaction.hospital.ilike(f"%{query}%"),
                Interaction.products.ilike(f"%{query}%"),
                Interaction.summary.ilike(f"%{query}%"),
            )
        )
        .order_by(Interaction.created_at.desc())
        .all()
    )

    return results


def get_interactions_by_query(
    db: Session,
    query: str,
):

    interactions = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.hcp_name.ilike(f"%{query}%"),
                Interaction.hospital.ilike(f"%{query}%"),
                Interaction.products.ilike(f"%{query}%"),
            )
        )
        .order_by(Interaction.created_at.desc())
        .all()
    )

    return interactions


def get_doctor_history(
    db: Session,
    doctor_name: str,
):

    interactions = (
        db.query(Interaction)
        .filter(
            Interaction.hcp_name.ilike(f"%{doctor_name}%")
        )
        .order_by(Interaction.created_at.desc())
        .all()
    )

    return interactions