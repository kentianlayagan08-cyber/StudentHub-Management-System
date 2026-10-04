# StudentHub Management System

A clean and professional student management system built with React (frontend) and Java Spring Boot (backend).

## Features
- Student login interface
- Student registration and profile management
- Dashboard with summary widgets
- Animated action buttons and modern card layout
- Edit and delete student records
- Java backend with REST API and H2 in-memory database

## Project Structure
- `frontend/` - React + Vite frontend
- `backend/` - Java Spring Boot backend

## Frontend Run
```bash
cd frontend
npm install
npm run dev
```

## Backend Run
```bash
cd backend
./mvnw spring-boot:run
```

## Default Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/students
- H2 Console: http://localhost:8080/h2-console

## Login Example
Use any email and password entered in the registration form, or use the sample data created by the frontend for demo purposes.

## Notes
This project was redesigned to move away from the old single-page CRUD layout and toward a more professional student portal experience.
