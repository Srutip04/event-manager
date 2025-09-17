from sqlalchemy.orm import Session
from . import models, schemas, auth

def create_user(db: Session, user_in: schemas.UserCreate):
    hashed = auth.hash_password(user_in.password)
    user = models.User(name=user_in.name, email=user_in.email, password_hash=hashed, role=user_in.role)
    db.add(user); db.commit(); db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user: return None
    if not auth.verify_password(password, user.password_hash): return None
    return user

def create_event(db: Session, ev: schemas.EventCreate):
    event = models.Event(**ev.dict())
    db.add(event); db.commit(); db.refresh(event)
    return event

def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

def list_events(db: Session): return db.query(models.Event).all()

def update_event(db: Session, event_id: int, ev: schemas.EventUpdate):
    e = get_event(db, event_id)
    if not e: return None
    for k,v in ev.dict().items(): setattr(e,k,v)
    db.commit(); db.refresh(e)
    return e

def delete_event(db: Session, event_id: int):
    e = get_event(db, event_id)
    if not e: return False
    db.delete(e); db.commit()
    return True
