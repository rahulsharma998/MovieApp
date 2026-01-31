# 🎬 Full-Stack Movie Management Application

A **production-ready full-stack web application** for managing and browsing movies with **role-based access control (RBAC)**, built using **modern backend and frontend technologies**.

---

## 🚀 Live Demo

* **Frontend:**
  👉 [https://movie-app-khaki-nine.vercel.app/login](https://movie-app-khaki-nine.vercel.app/login)

* **Backend API:**
  👉 [https://movieapp-908u.onrender.com/](https://movieapp-908u.onrender.com/)

* **Swagger Docs:**
  👉 [https://movieapp-908u.onrender.com/api/docs](https://movieapp-908u.onrender.com/api/docs)

---

## 🧠 Project Overview

This application allows users to browse movies, while **admins can securely manage movie data**.

### 👥 Roles

#### 👤 User

* View movie list
* View movie details

#### 🛠 Admin

* Create movies
* Update movies
* Delete movies

> 🔒 All write operations are **strictly protected by backend role-based access control**.

---

## 🛠 Tech Stack

### 🎨 Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **DaisyUI**
* **Zustand** (state management)
* **Axios**
* **React-Toastify**

### ⚙️ Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Role-Based Access Control (RBAC)**
* **Swagger / OpenAPI**

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing
* Role-based route protection
* Auth persistence on refresh

### 🎬 Movies

* Browse movies with posters
* Search by title
* Filter by genre
* Pagination support
* Movie details page

### 🛠 Admin Panel

* Add new movies
* Edit existing movies
* Delete movies
* Admin-only access enforced on backend

### 🧑‍💻 Developer Experience

* Swagger API documentation
* Clean and scalable folder structure
* Centralized API & state management
* JSON-based data seeding

---

## 🧱 Project Architecture

### 📦 Backend Structure

```
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
```

### 🎨 Frontend Structure

```
frontend/
│── src/
│   ├── app/
│   ├── components/
│   ├── store/
│   ├── services/
│   └── styles/
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns **JWT + user role**
3. Token is stored in browser storage
4. Token is sent with every request:

   ```
   Authorization: Bearer <token>
   ```
5. Backend validates **token and role** on every request

---

## 📦 API Documentation (Swagger)

Swagger UI is available at:

```
/api-docs
```

### Includes:

* Authentication APIs
* Movie CRUD APIs
* JWT Bearer authentication
* Role-based access details

---

## 🗄 Database Schema (Movie)

```json
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
```

---

## 🌱 Initial Data Seeding

Movies are seeded using a **JSON-based seeding script** instead of APIs to avoid exposing bulk write operations.

```bash
node src/scripts/seedMovies.js
```

---

## ⚙️ Setup Instructions

### 🔙 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
```

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_backend_url
```

---

## 🚢 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 🧠 Key Takeaways

This project demonstrates:

* Clean backend architecture
* Secure JWT authentication & RBAC
* Modern Next.js App Router usage
* Scalable state management with Zustand
* Real-world API design & documentation
* Production-ready deployment mindset
