
# Nursery System

This Nursery System allows administrators to perform CRUD operations on children,class and teachers, as well as change passwords for any child and teacher without requiring the old password.

# Features

- **Admin Operations:**
  - login
  - CRUD operations on children,classes and teachers.
  - Change password for any child and teacher without old password verification.

- **Teacher Operations:**
  - Register ,login and access own data.
  - Update own data.
  - Change password with old password verification.

- **Child Operations:**
  - Login and access own data.
  - Update own data.
  - Change password with old password verification.

# Environment Variables

The system requires the following environment variables to be set in a `.env` file:
SECRET_KEY=your_secret_key_123456
DB_URL=mongodb://127.0.0.1:27017/ITISystem
PORT=8080
