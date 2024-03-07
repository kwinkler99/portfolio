from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship

from app.db.database import Base

class Score(Base):
    __tablename__ = 'scores'
    id  = Column(Integer, primary_key=True, index=True)
    value = Column(Integer)