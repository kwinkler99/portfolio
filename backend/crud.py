from sqlalchemy.orm import Session

from models import Score
from schema import ScoreCreate

def get_scores(db: Session):
    return db.query(Score).all()

def save_score(db: Session, score: ScoreCreate):
    db_score = Score(value=score.value)
    db.add(db_score)
    db.commit()
    db.refresh(db_score)
    return db_score