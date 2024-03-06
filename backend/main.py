from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from crud import get_scores, save_score
from models import Base
from schema import Score, ScoreCreate
from database import SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/scores", response_model=list[Score])
def read_scores(db: Session = Depends(get_db)):
    scores = get_scores(db)
    return scores

@app.post("/score", response_model=Score)
def create_score(score: ScoreCreate, db: Session = Depends(get_db)):
    return save_score(db=db, score=score)


