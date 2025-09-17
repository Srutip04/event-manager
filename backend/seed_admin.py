from app.database import engine, SessionLocal, Base
from app import models, auth

def seed():
    print("Creating tables (if not exist)...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        admin_email = "admin@example.com"
        if db.query(models.User).filter(models.User.email == admin_email).first():
            print("Admin already exists:", admin_email)
            return
        admin = models.User(
            name="Admin",
            email=admin_email,
            password_hash=auth.hash_password("adminpass"),
            role="admin"
        )
        db.add(admin)
        db.commit()
        print("Created admin user:", admin_email, "password: adminpass")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
