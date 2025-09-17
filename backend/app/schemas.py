from pydantic import BaseModel, EmailStr
from datetime import date, time, datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "normal"

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: date
    time: Optional[time] = None
    image_url: Optional[str] = None

class EventCreate(EventBase): pass
class EventUpdate(EventBase): pass

class EventOut(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True
