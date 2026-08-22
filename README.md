# Logistics Platform 🚚

A full-stack Logistics Management Platform that allows users to register, log in, and manage shipments with priority-based routing and tracking. The application is deployed in the cloud using modern web technologies and supports user-specific shipment management.

## 🌐 Live Demo

### Frontend

https://logistics-platform-rho.vercel.app/

### Backend API

https://logistics-platform-api-9qy0.onrender.com

---

## ✨ Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt

### Shipment Management

* Create Shipments
* View Shipments
* Update Shipment Status
* Delete Shipments
* User-Specific Shipments
* Shipment Tracking IDs

### Priority Management

* LOW Priority
* MEDIUM Priority
* HIGH Priority
* EXPRESS Priority

### Smart Sorting

Shipments are automatically displayed in the following order:

1. EXPRESS
2. HIGH
3. MEDIUM
4. LOW

Within the same priority level, newer shipments appear first.

### Tracking System

Each shipment is automatically assigned a unique tracking ID.

Example:

TRK-2026-A7F4K9

### Dashboard Statistics

* Total Shipments
* Pending Shipments
* In Transit Shipments
* Delivered Shipments

### Security

* JWT Protected Routes
* User Data Isolation
* Password Encryption

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs

### Database

* PostgreSQL
* Neon Database

### Deployment

* Vercel (Frontend)
* Render (Backend)

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```
logistics-platform
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── assets
│   ├── App.jsx
│   ├── App.css
│   └── vercel.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## 🗄 Database Schema

### Users Table

| Column     | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | TEXT      |
| created_at | TIMESTAMP |

### Shipments Table

| Column        | Type      |
| ------------- | --------- |
| id            | SERIAL    |
| shipment_name | VARCHAR   |
| origin        | VARCHAR   |
| destination   | VARCHAR   |
| priority      | VARCHAR   |
| status        | VARCHAR   |
| tracking_id   | VARCHAR   |
| user_id       | INTEGER   |
| created_at    | TIMESTAMP |

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/anandithag2007/logistics-platform.git
cd logistics-platform
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a .env file:

```
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Shipment Workflow

User Login
↓
Create Shipment
↓
Tracking ID Generated
↓
Priority Assigned
↓
Stored in PostgreSQL
↓
Displayed on Dashboard
↓
Status Updated
↓
Delivered

---

## 🔮 Future Enhancements

* Search Shipments
* Filter Shipments
* Dashboard Charts
* Edit Shipment Details
* Admin Dashboard
* Email Notifications
* Real-Time Tracking
* Route Optimization
* Dark Mode

---

## 👩‍💻 Developer

**Ananditha G**

GitHub:
https://github.com/anandithag2007

---

## 📄 License

This project is developed for learning, portfolio, and academic purposes.
