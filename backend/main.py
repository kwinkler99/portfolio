from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.crud.crud import get_scores, save_score
from app.models.models import Base
from app.schema.schema import Score, ScoreCreate
from app.db.database import SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


