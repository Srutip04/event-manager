from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud, auth, database

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],  
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
models.Base.metadata.create_all(bind=database.engine)

@app.post("/auth/signup", response_model=schemas.UserOut)
def signup(user_in: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.email==user_in.email).first():
        raise HTTPException(400, "Email already registered")
    return crud.create_user(db, user_in)

@app.post("/auth/token", response_model=schemas.Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.authenticate_user(db, form.username, form.password)
    if not user: raise HTTPException(400, "Invalid credentials")
    token = auth.create_access_token({"sub": str(user.id), "role": user.role})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/events", response_model=list[schemas.EventOut])
def events(db: Session = Depends(database.get_db)):
    return crud.list_events(db)

@app.post("/admin/events", response_model=schemas.EventOut)
def create_event(ev: schemas.EventCreate, db: Session = Depends(database.get_db), _: models.User = Depends(auth.require_admin)):
    return crud.create_event(db, ev)

@app.put("/admin/events/{event_id}", response_model=schemas.EventOut)
def update_event(event_id: int, ev: schemas.EventUpdate, db: Session = Depends(database.get_db), _: models.User = Depends(auth.require_admin)):
    e = crud.update_event(db, event_id, ev)
    if not e: raise HTTPException(404, "Not found")
    return e

@app.delete("/admin/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(database.get_db), _: models.User = Depends(auth.require_admin)):
    if not crud.delete_event(db, event_id): raise HTTPException(404, "Not found")
    return {"ok": True}
