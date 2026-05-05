# 📇 Contact Management System

A full-stack Contact Management System built with **React + Vite**, **Spring Boot**, and **PostgreSQL**.

---

## 🗂️ Project Structure

```
contact management system/
├── backend/                        # Spring Boot application
│   ├── src/main/java/com/contactmanager/
│   │   ├── config/                 # Security configuration
│   │   ├── controller/             # REST controllers
│   │   ├── dto/                    # Data Transfer Objects
│   │   ├── entity/                 # JPA entities
│   │   ├── exception/              # Global exception handler
│   │   ├── repository/             # JPA repositories
│   │   ├── security/               # JWT filter & service
│   │   └── service/                # Business logic
│   └── src/main/resources/
│       ├── application.properties
│       └── schema.sql
├── frontend/                       # React + Vite application
│   └── src/
│       ├── components/             # Reusable UI components
│       ├── context/                # AuthContext, ThemeContext
│       ├── hooks/                  # useDebounce
│       ├── pages/                  # Login, Register, Dashboard, Contacts, Profile
│       ├── services/               # Axios API calls
│       └── utils/                  # Validation helpers
├── ContactManager.postman_collection.json
└── README.md
```

---

## ⚙️ Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- PostgreSQL 14+

---

## 🚀 Setup Instructions

### Step 1 — PostgreSQL Database

```sql
-- Open psql and run:
CREATE DATABASE contact_manager;
```

### Step 2 — Backend Setup

1. Open `backend/src/main/resources/application.properties`
2. Update your PostgreSQL credentials:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```
3. Run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The server starts at **http://localhost:8080**

### Step 3 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The app opens at **http://localhost:5173**

---

## 🔐 API Endpoints

| Method | Endpoint                  | Auth | Description           |
|--------|---------------------------|------|-----------------------|
| POST   | /api/auth/register        | No   | Register new user     |
| POST   | /api/auth/login           | No   | Login, returns JWT    |
| GET    | /api/contacts             | Yes  | Get contacts (paged)  |
| GET    | /api/contacts?search=name | Yes  | Search contacts       |
| POST   | /api/contacts             | Yes  | Create contact        |
| PUT    | /api/contacts/{id}        | Yes  | Update contact        |
| DELETE | /api/contacts/{id}        | Yes  | Delete contact        |
| GET    | /api/contacts/export      | Yes  | Export contacts CSV   |

---

## 🧪 Postman Testing

1. Import `ContactManager.postman_collection.json` into Postman
2. Run **Register** to create an account
3. Run **Login** — the token is auto-saved to collection variables
4. All other requests use the token automatically

---

## ✨ Features

- ✅ JWT Authentication (Register / Login / Logout)
- ✅ Role-based access (USER / ADMIN)
- ✅ Full CRUD for contacts
- ✅ Search by name or email
- ✅ Pagination
- ✅ Export contacts to CSV
- ✅ Dark mode toggle
- ✅ Protected routes
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Profile page

---

## 🛠️ Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, React Router v6   |
| Styling  | Pure CSS with CSS variables       |
| HTTP     | Axios                             |
| Backend  | Spring Boot 3.2, Spring Security  |
| Auth     | JWT (jjwt 0.11.5)                 |
| Database | PostgreSQL + Spring Data JPA      |
| Build    | Maven                             |
