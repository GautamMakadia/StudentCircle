from fastapi import FastAPI, HTTPException
import asyncpg
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel

# Student Model
class Student(BaseModel):
    id: int
    enrollment_no: int
    name: str
    branch: str
    department: str
    semester: int
    email: str
    password: str

# Teacher Model
class Teacher(BaseModel):
    id: int
    password: str
    firstname: str
    lastname: str
    email: str
    phonenumber: str
    department: str
    gender: int

# Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str
    role: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection details
DB_CONFIG = {
    "user": "postgres",
    "password": "postgres",
    "database": "student_circle",
    "host": "10.150.149.129",  
    "port": 5432          
}

# Function to establish a database connection
async def connect_to_db():
    return await asyncpg.connect(**DB_CONFIG)

# Fetch content from the database and write to content.json
async def fetch_content():
    conn = await connect_to_db()
    
    query = "SELECT * FROM content;"
    content_list = await conn.fetch(query)
    
    # Convert records to dictionary format
    content_list = [dict(record) for record in content_list]

    await conn.close()
    return content_list

@app.get("")
async def index():
    return "Hello"

# API route to get all content
@app.get("/content")
async def get_content():
    content = await fetch_content()
    return {"content": content}

# Fetch student by ID
@app.get("/student/{id}")
async def get_student(id: int):
    conn = await connect_to_db()
    student = await conn.fetchrow("SELECT * FROM student WHERE id = $1", id)
    await conn.close()

    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")

    return dict({
        "ID": student["id"],
        "Enrollment_no": student["enrollment_no"],
        "Name": student["name"],
        "Branch": student["branch"],
        "Department": student["department"],
        "Semester": student["semester"],
        "Email ID": student["email"],
        "Password": student["password"]
    })


# Fetch teacher by ID
@app.get("/teacher/{id}")
async def get_teacher(id: int):
    conn = await connect_to_db()
    teacher = await conn.fetchrow("SELECT * FROM teacher WHERE id = $1", id)
    await conn.close()

    if teacher is None:
        raise HTTPException(status_code=404, detail="Teacher not found")

    return dict({
        "ID": teacher["id"],
        "Password": teacher["password"],
        "Firstname": teacher["firstname"],
        "Lastname": teacher["lastname"],
        "Email ID": teacher["email"],
        "Contact no.": teacher["phonenumber"],
        "Department": teacher["department"],
        "Gender": teacher["gender"]
    })

@app.post("/login")
async def login(data: LoginRequest):
    if data.role not in ["student", "teacher"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    query = f"""
    SELECT id FROM {data.role}
    WHERE email = $1 AND password = $2
    """

    # Create a database connection
    conn = await connect_to_db()

    try:
        result = await conn.fetchrow(query, data.email, data.password)

        if result:
            return {"id": result["id"], "role": data.role}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    finally:
        await conn.close()


@app.get("/content/pending")
async def get_pending_content():
    query = "SELECT * FROM content WHERE teacher_id IS NULL;"

    conn = await connect_to_db()

    records = await conn.fetch(query)

    if len(records) == 0: return  {"content": []}

    return {"content": [dict(record) for record in records]}

@app.get("/content/approved")
async def get_approved_content():
    query = "SELECT * FROM content WHERE teacher_id IS NOT NULL;"
    conn = await connect_to_db()

    records = await conn.fetch(query)
    
    return {"content": [dict(record) for record in records]}

@app.put("/content/approve/{content_id}/{teacher_id}")
async def approve_content(content_id: int, teacher_id: int):
    query = "UPDATE content SET teacher_id = $1 WHERE id = $2;"
    await connect_to_db().execute(query, teacher_id, content_id)
    return {"message": f"Content with id {content_id} approved by teacher {teacher_id}!"}

@app.get("/content/user/{user_id}/{status}")
async def get_user_content_by_status(user_id: int, status: str):
    if status == "pending":
        query = "SELECT * FROM content WHERE student_id = $1 AND teacher_id IS NULL;"
    elif status == "approved":
        query = "SELECT * FROM content WHERE student_id = $1 AND teacher_id IS NOT NULL;"
    else:
        return {"error": "Invalid status. Use 'pending' or 'approved'."}
    
    records = await connect_to_db().fetch_all(query, user_id)
    return {"content": [dict(record) for record in records]}


if __name__ == "__main__":
    uvicorn.run(app="main:app", host="10.150.148.207", port=5500, reload=True)