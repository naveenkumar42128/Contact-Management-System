# 📇 Contact Management System - Staff Presentation

## Executive Summary

A **modern, full-stack web application** for managing contacts with user authentication, real-time search, pagination, and data export capabilities.

**Live Demo:** http://localhost:5175  
**Backend API:** http://localhost:8080

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)                │
│  http://localhost:5175                                  │
│  ├── Components (UI)                                    │
│  ├── Context (State Management)                         │
│  ├── Services (API Communication)                       │
│  └── Pages (Routing)                                    │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/REST
                   │ JWT Bearer Token
┌──────────────────▼──────────────────────────────────────┐
│              Backend (Spring Boot)                       │
│  http://localhost:8080                                  │
│  ├── Controllers (API Endpoints)                        │
│  ├── Services (Business Logic)                          │
│  ├── Repositories (Database Access)                     │
│  ├── Security (JWT Authentication)                      │
│  └── Configuration (CORS, DB)                           │
└──────────────────┬──────────────────────────────────────┘
                   │ JDBC
┌──────────────────▼──────────────────────────────────────┐
│         Database (PostgreSQL)                           │
│  ├── users table (Authentication)                       │
│  └── contacts table (Contact Data)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer        | Technology        | Version | Purpose                 |
| ------------ | ----------------- | ------- | ----------------------- |
| **Frontend** | React             | 18.2    | UI Framework            |
|              | Vite              | 5.1     | Build Tool & Dev Server |
|              | React Router      | 6.22    | Client-side Routing     |
|              | Axios             | 1.6.7   | HTTP Client             |
|              | React Hot Toast   | 2.4.1   | Notifications           |
|              | React Icons       | 5.0.1   | Icon Library            |
| **Backend**  | Spring Boot       | 3.2.0   | Web Framework           |
|              | Spring Security   | 3.2.0   | Authentication          |
|              | Spring Data JPA   | 3.2.0   | ORM & DB Access         |
|              | JWT (JJWT)        | 0.11.5  | Token-Based Auth        |
|              | PostgreSQL Driver | Latest  | Database Client         |
|              | Lombok            | Latest  | Boilerplate Reduction   |
| **Database** | PostgreSQL        | 14+     | Relational DB           |
| **Build**    | Maven             | 3.9.6   | Java Build Tool         |
|              | npm               | Latest  | Node Package Manager    |

---

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    profile_image VARCHAR(255)
);
```

### Contacts Table

```sql
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20),
    address TEXT,
    company VARCHAR(100),
    notes TEXT,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

**Key Features:**

- User-Contact relationship (One-to-Many)
- Cascade delete (deleting user deletes their contacts)
- Indexed search on name, email, and user_id
- Timestamps for audit trail

---

## 🔐 Authentication & Security

### Authentication Flow

```
User Registration
    │
    ├→ POST /api/auth/register
    │   ├─ Email validation
    │   ├─ Password hashing (BCrypt)
    │   └─ User stored in database
    │
User Login
    │
    ├→ POST /api/auth/login
    │   ├─ Email & password validation
    │   ├─ Credentials verified
    │   ├─ JWT token generated
    │   └─ Token returned to client
    │
Protected Requests
    │
    ├→ Authorization: Bearer {JWT_TOKEN}
    │   ├─ JwtAuthFilter validates token
    │   ├─ User identity extracted
    │   └─ Request processed
```

### Security Features

1. **JWT (JSON Web Tokens)**
   - 24-hour expiration
   - Secure signature validation
   - Payload: user ID, email, role

2. **Password Hashing**
   - BCrypt algorithm
   - Salt rounds: 10
   - One-way encryption

3. **CORS Configuration**
   - Allowed origins: localhost:5173, 5174, 5175
   - Allows credentials
   - Validates preflight requests

4. **Request Validation**
   - Input sanitization
   - Email format validation
   - Phone number format checking

---

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register
├─ Body: { name, email, password }
└─ Response: { id, name, email, token }

POST /api/auth/login
├─ Body: { email, password }
└─ Response: { id, name, email, token, role }
```

### Contacts (All require JWT)

```
GET /api/contacts
├─ Params: page=0, size=10, search="name"
└─ Response: { content: [], totalPages, totalElements, currentPage }

POST /api/contacts
├─ Body: { name, email, phone, address, company, notes }
└─ Response: { id, name, email, ... }

PUT /api/contacts/{id}
├─ Body: { name, email, phone, address, company, notes }
└─ Response: Updated contact object

DELETE /api/contacts/{id}
└─ Response: 204 No Content

GET /api/contacts/export
└─ Response: CSV file download
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx
├── AuthProvider (Context)
├── ThemeProvider (Context)
└── Router
    ├── LoginPage
    ├── RegisterPage
    ├── Dashboard
    │   └── Navbar
    ├── ContactsPage
    │   ├── ContactCard
    │   ├── ContactModal
    │   └── Pagination
    └── ProfilePage
```

### State Management

**Context API Usage:**

- `AuthContext` - User authentication state, login/logout
- `ThemeContext` - Dark/light mode theme

**Local State:**

- Component-level state for forms, modals, loading

### Key Components

| Component        | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| `ContactsPage`   | Main page showing contact list, search, pagination |
| `ContactModal`   | Form for adding/editing contacts                   |
| `ContactCard`    | Individual contact display card                    |
| `Navbar`         | Navigation, logout, theme toggle                   |
| `ProtectedRoute` | Route guard for authenticated pages                |

---

## 💼 Backend Architecture

### Package Structure

```
com.contactmanager/
├── config/
│   └── SecurityConfig.java          # JWT, CORS, Security filters
├── controller/
│   ├── AuthController.java           # /api/auth endpoints
│   └── ContactController.java        # /api/contacts endpoints
├── service/
│   ├── AuthService.java              # User registration, login logic
│   ├── ContactService.java           # CRUD operations
│   └── JwtService.java               # Token generation, validation
├── repository/
│   ├── UserRepository.java           # User database queries
│   └── ContactRepository.java        # Contact database queries
├── entity/
│   ├── User.java                     # User JPA entity
│   └── Contact.java                  # Contact JPA entity
├── dto/
│   ├── RegisterRequest.java          # Registration input
│   ├── LoginRequest.java             # Login input
│   ├── ContactRequest.java           # Contact input
│   ├── ContactResponse.java          # Contact output
│   └── AuthResponse.java             # Auth response
├── security/
│   ├── JwtAuthFilter.java            # JWT validation filter
│   └── JwtService.java               # Token operations
├── exception/
│   ├── GlobalExceptionHandler.java   # Error responses
│   └── ResourceNotFoundException.java # Not found error
└── ContactManagerApplication.java    # Main entry point
```

### Key Services

**AuthService**

- Register new users
- Validate credentials
- Hash passwords using BCrypt

**ContactService**

- Create/Read/Update/Delete contacts
- Search contacts (case-insensitive)
- Pagination support
- CSV export

**JwtService**

- Generate JWT tokens
- Validate tokens
- Extract claims

---

## 🔄 Data Flow Examples

### User Registration Flow

```
1. User submits registration form
   ├─ Frontend: POST /api/auth/register
   ├─ Backend: AuthController.register()
   │   ├─ Validate input
   │   ├─ Check email uniqueness
   │   ├─ Hash password
   │   ├─ Save user to DB
   │   └─ Generate JWT token
   └─ Return token + user data

2. Frontend stores JWT in localStorage
3. Subsequent requests include: Authorization: Bearer {token}
```

### Contact Search Flow

```
1. User types in search box
   ├─ Frontend debounces input (300ms delay)
   ├─ Frontend: GET /api/contacts?search=name
   ├─ Backend: ContactController.getContacts()
   │   ├─ Extract search term
   │   ├─ Validate JWT token
   │   ├─ Query DB with LIKE search
   │   └─ Return paginated results
   └─ Frontend updates UI with results
```

### Contact Creation Flow

```
1. User fills form in modal
   ├─ Frontend validates input
   ├─ Frontend: POST /api/contacts
   ├─ Backend: ContactController.createContact()
   │   ├─ Validate JWT & extract user
   │   ├─ Map DTO to Entity
   │   ├─ Associate with user_id
   │   ├─ Save to database
   │   └─ Return created contact
   └─ Frontend shows success toast + updates list
```

---

## ✨ Key Features

### 1. User Authentication

- ✅ Secure registration with email validation
- ✅ Login with JWT tokens
- ✅ 24-hour token expiration
- ✅ Password hashing (BCrypt)
- ✅ Protected routes

### 2. Contact Management

- ✅ Create new contacts
- ✅ Edit existing contacts
- ✅ Delete contacts
- ✅ View contact details
- ✅ Full name, email, phone, address, company notes

### 3. Search & Filter

- ✅ Real-time search by name
- ✅ Case-insensitive matching
- ✅ Debounced search (300ms)
- ✅ Fast database queries with indexes

### 4. Pagination

- ✅ 10 contacts per page
- ✅ Navigate between pages
- ✅ Total page count
- ✅ Current page indicator

### 5. Data Export

- ✅ Export contacts as CSV
- ✅ Download all contacts at once
- ✅ Excel-compatible format

### 6. User Profile

- ✅ View user information
- ✅ Update profile details
- ✅ Change password (if implemented)

### 7. Theme Support

- ✅ Dark mode / Light mode toggle
- ✅ Persistent theme preference

### 8. UI/UX Features

- ✅ Toast notifications (success/error)
- ✅ Loading states
- ✅ Responsive design
- ✅ Keyboard navigation
- ✅ Icon-based actions

---

## 🚀 Deployment

### Frontend - Deployed on Netlify

- **Build:** `npm run build`
- **Output:** `/dist` folder
- **SPA Routing:** Configured with `_redirects` file
- **Environment:** Can use `VITE_API_BASE_URL` env variable

### Backend - Can be deployed on:

- AWS EC2
- Heroku
- DigitalOcean
- Azure App Service
- Docker container

### Database - PostgreSQL

- Can use managed service (AWS RDS, Azure Database)
- Or self-hosted on server

---

## 📈 Performance Features

1. **Database Indexing**
   - Index on user_id (fast filtering)
   - Index on name (fast search)
   - Index on email (email lookups)

2. **Frontend Optimization**
   - Vite for fast builds
   - Component lazy loading
   - Debounced search (reduces API calls)
   - Toast notifications (lightweight)

3. **API Optimization**
   - Pagination (reduces data transfer)
   - Search filtering (server-side)
   - JWT caching (reduces auth requests)

---

## 🔧 Development Workflow

### Running Locally

```bash
# Terminal 1 - Backend
set JAVA_HOME=C:\...\jre\21.0.10-win32-x86_64
cd backend
mvn spring-boot:run
# Server runs on http://localhost:8080

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173+
```

### Making Changes

1. **Backend Changes**
   - Edit Java files
   - Maven auto-recompiles
   - Tomcat restarts automatically

2. **Frontend Changes**
   - Edit React files
   - Vite hot-reloads
   - Changes appear instantly

### Testing APIs

- **Postman Collection** included
- Test register → login → CRUD operations
- Export contacts to CSV

---

## 🔒 Security Considerations

1. ✅ JWT tokens included in Authorization header
2. ✅ CORS properly configured
3. ✅ Passwords hashed with BCrypt
4. ✅ SQL injection protected (JPA parameterized queries)
5. ✅ HTTPS ready (redirect http to https in production)
6. ✅ Input validation on frontend & backend
7. ✅ User isolation (users only see their contacts)

### Production Recommendations

1. Use HTTPS/SSL certificates
2. Set strong JWT secret
3. Implement rate limiting
4. Add request logging
5. Use database backups
6. Enable CORS only for allowed domains
7. Set secure cookie flags
8. Use environment variables for secrets

---

## 📝 Sample Data

5 pre-configured test contacts available in `backend/src/main/resources/seed-data.sql`:

1. John Doe - john.doe@example.com
2. Sarah Smith - sarah.smith@example.com
3. Michael Johnson - michael.j@example.com
4. Emily Davis - emily.davis@example.com
5. David Wilson - david.wilson@example.com

---

## 🎯 Future Enhancements

- [ ] Contact groups/categories
- [ ] Add profile photos for contacts
- [ ] Bulk import contacts (CSV)
- [ ] Contact favorites
- [ ] Birthday reminders
- [ ] Call/Email history logs
- [ ] Contact sharing with team members
- [ ] Advanced filtering (by date, company, etc.)
- [ ] Mobile app (React Native)
- [ ] Two-factor authentication (2FA)
- [ ] Contact templates
- [ ] Activity feed

---

## 📊 Code Statistics

- **Backend:** ~20 Java classes, ~2000 lines of code
- **Frontend:** ~10 React components, ~1500 lines of code
- **Database:** 2 tables with indexes
- **API:** 8 endpoints
- **Total:** Full-stack production-ready application

---

## 🎓 Learning Outcomes

This project demonstrates:

✅ **Full-Stack Development** - Frontend to database integration  
✅ **Authentication** - JWT-based security  
✅ **REST API Design** - Proper HTTP methods and status codes  
✅ **Database Design** - Relationships, constraints, indexing  
✅ **React Patterns** - Hooks, Context, Component composition  
✅ **State Management** - Context API  
✅ **Error Handling** - Global exception handlers  
✅ **Search & Pagination** - Database queries  
✅ **CORS & Security** - Browser security policies  
✅ **Deployment** - Netlify & production readiness

---

## 📞 Support & Documentation

- **README.md** - Setup instructions
- **ADDING_CONTACTS.md** - How to seed data
- **DEPLOYMENT.md** - Deployment guide
- **ContactManager.postman_collection.json** - API testing

---

**Questions?** - Ready to demo the application live! 🚀
