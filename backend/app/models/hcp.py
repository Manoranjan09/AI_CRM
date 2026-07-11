from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class HCP(Base):

    __tablename__ = "hcp"

    id = Column(Integer, primary_key=True, index=True)

    doctor_name = Column(String, nullable=False)

    speciality = Column(String)

    hospital = Column(String)

    city = Column(String)

    phone = Column(String)

    email = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )