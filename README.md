

````markdown
# 🎟️ Event Management App  

A full-stack **Event Management Application** with:  
- **Frontend:** React.js + Tailwind CSS  
- **Backend:** Python (FastAPI)  
- **Database:** PostgreSQL  

---

## 📌 Features
- Admin authentication (JWT-based)  
- Admin can create, update, and delete events  
- Users can view upcoming events in a polished React UI  
- API testing with `curl` or Postman  

---

## ⚙️ Backend Setup (FastAPI + PostgreSQL)

### 1. Clone repository
```bash
git clone <repo-url>
cd backend
````

### 2. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Setup PostgreSQL

Make sure PostgreSQL is running.
For macOS (Homebrew):

```bash
brew services start postgresql@14
```

Login to psql and create database:

```sql
psql -d postgres
CREATE DATABASE eventsdb;
\q
```

### 5. Configure environment variables

Create `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:yourpassword@localhost:5432/eventsdb
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 6. Run DB migrations

```bash
alembic upgrade head
```

### 7. Seed admin user

```bash
python seed_admin.py
```

### 8. Run FastAPI server

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
Interactive API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🎨 Frontend Setup (React + Tailwind)

### 1. Move to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend

```bash
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ API Testing

### 1. Admin Login (get JWT token)

```bash
curl -X POST http://127.0.0.1:8000/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@example.com&password=adminpass"
```

**Response:**

```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}
```

Save the token:

```bash
export TOKEN=<JWT_TOKEN>
```

---

### 2. Create Event

```bash
curl -X POST http://127.0.0.1:8000/admin/events \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Event","description":"Test event","date":"2025-09-20","time":"10:00:00","image_url":"https://picsum.photos/400"}'
```

---

### 3. Get All Events

```bash
curl -X GET http://127.0.0.1:8000/events
```

---

### 4. Delete Event (example with eventId = 1)

```bash
curl -X DELETE http://127.0.0.1:8000/admin/events/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## ✅ Testing APIs in Postman

1. Open **Postman**
2. Create a new collection `Event Management`
3. Add requests for Login, Create Event, Get Events, Delete Event
4. Set `Authorization → Bearer Token` with the token from login

---

