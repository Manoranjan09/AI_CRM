from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(255), nullable=False)

    hospital = Column(String(255))

    speciality = Column(String(255))

    interaction_type = Column(String(100))

    products = Column(Text)

    notes = Column(Text)

    summary = Column(Text)

    follow_up_date = Column(Date)

    created_at = Column(DateTime(timezone=True), server_default=func.now())