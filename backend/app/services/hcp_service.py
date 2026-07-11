from sqlalchemy.orm import Session

from app.models.hcp import HCP


def create_hcp(db: Session, data):

    hcp = HCP(**data.model_dump())

    db.add(hcp)

    db.commit()

    db.refresh(hcp)

    return hcp


def get_hcps(db: Session):

    return db.query(HCP).order_by(HCP.doctor_name).all()


def get_hcp(db: Session, hcp_id: int):

    return db.query(HCP).filter(HCP.id == hcp_id).first()


def update_hcp(db: Session, hcp_id: int, data):

    hcp = get_hcp(db, hcp_id)

    if not hcp:
        return None

    for key, value in data.model_dump().items():

        setattr(hcp, key, value)

    db.commit()

    db.refresh(hcp)

    return hcp


def delete_hcp(db: Session, hcp_id: int):

    hcp = get_hcp(db, hcp_id)

    if not hcp:
        return None

    db.delete(hcp)

    db.commit()

    return True