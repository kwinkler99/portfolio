from pydantic import BaseModel

class ScoreBase(BaseModel):
    value: int

class ScoreCreate(ScoreBase):
    pass

class Score(ScoreBase):
    id: int

    class Config:
        orm_mode = True