Full-Stack Movie Management Application

A production-ready full-stack web application for managing and browsing movies with role-based access control, built using modern technologies on both backend and frontend.

🚀 Live Demo

Frontend: https://your-frontend-url.vercel.app

Backend API: (https://movieapp-908u.onrender.com/)

Swagger Docs: https://movieapp-908u.onrender.com/api/docs

🧠 Project Overview

This application allows users to browse movies and admins to manage movie data securely.

Roles

User

View movie list

View movie details

Admin

Create movies

Update movies

Delete movies

All write operations are strictly protected by backend role-based access control.

🛠 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

DaisyUI

Zustand (state management)

Axios

React-Toastify

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Role-Based Access Control (RBAC)

Swagger / OpenAPI

✨ Features
Authentication & Authorization

JWT-based authentication

Secure password hashing

Role-based route protection

Auth persistence on refresh

Movies

Browse movies with posters

Search by title

Filter by genre

Pagination

Movie details page

Admin Panel

Add new movies

Edit existing movies

Delete movies

Admin-only access enforced on backend

Developer Experience

Swagger API documentation

Clean folder structure

Centralized API & state logic

JSON-based data seeding

🧱 Project Architecture
Backend Structure
backend/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── docs/
│   ├── scripts/
│   └── app.js
│── server.js
│── .env

Frontend Structure
frontend/
│── src/
│   ├── app/
│   ├── components/
│   ├── store/
│   ├── services/
│   └── styles/

🔐 Authentication Flow

User logs in

Backend returns JWT + user role

Token stored in browser storage

Token sent via Authorization: Bearer <token>

Backend validates token & role on every request

📦 API Documentation (Swagger)

Swagger UI is available at:

/api-docs


Includes:

Auth APIs

Movie CRUD APIs

JWT Bearer authentication

Role-based access details

🗄 Database Schema (Movie)
{
  "title": "string",
  "genre": "string",
  "releaseYear": number,
  "rating": number,
  "description": "string",
  "posterUrl": "string",
  "director": "string",
  "durationMinutes": number,
  "createdAt": "date",
  "updatedAt": "date"
}

🌱 Initial Data Seeding

Movies are seeded using a JSON seeding script instead of APIs to avoid exposing bulk write operations.

node src/scripts/seedMovies.js

⚙️ Setup Instructions
Backend
cd backend
npm install
npm run dev


Create .env:

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret

Frontend
cd frontend
npm install
npm run dev


Create .env.local:

NEXT_PUBLIC_API_URL=your_backend_url

🚢 Deployment

Frontend: Vercel

Backend: Render / Railway / EC2

Database: MongoDB Atlas
