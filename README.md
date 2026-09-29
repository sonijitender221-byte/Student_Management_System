# Student Management System Starter Kit (MERN-Style + EJS)

A premium boilerplate project for practicing backend development concepts in a Student Management System.

## What This Starter Includes
- ES Modules setup (`type: module`)
- Node.js + Express app shell
- MongoDB + Mongoose model placeholders
- Passport/Passport-Local scaffolding placeholders
- Session scaffolding placeholders
- Professional EJS-based admin UI
- Modern responsive CSS starter (no Bootstrap/Tailwind)
- MVC-inspired folder structure
- Deep implementation roadmap in `docs/IMPLEMENTATION_GUIDE.md`

## What Is Intentionally Missing
To support learning, this project **does not include real backend logic**.

Students should implement:
- Login/Register/Logout
- Passport local strategy
- Session auth flow
- Route protection middleware
- Role-based authorization
- CRUD operations for students
- Validation and error handling
- MongoDB queries

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- EJS
- bcrypt
- passport
- passport-local
- express-session

## Folder Structure

```text
project-root/
├── server.js
├── package.json
├── README.md
├── config/
│   ├── db.js
│   └── passport.js
├── models/
│   ├── User.js
│   └── Student.js
├── routes/
│   ├── authRoutes.js
│   └── studentRoutes.js
├── controllers/
│   ├── authController.js
│   └── studentController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── public/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── uploads/
├── views/
│   ├── partials/
│   ├── auth/
│   ├── dashboard/
│   ├── students/
│   └── errors/
└── docs/
    ├── README.md
    └── IMPLEMENTATION_GUIDE.md
```

## Installation

1. Install dependencies:
```bash
npm install
```
2. Start server:
```bash
npm run dev
```
3. Open in browser:
```text
http://localhost:3000
```

## Learning Objectives
By implementing missing TODO blocks, students can practice:
- MVC architecture in Express
- Authentication with Passport Local
- Password hashing with bcrypt
- Session-based login systems
- MongoDB schema design with Mongoose
- CRUD controller/service flow
- Route and role protection
- Dashboard-oriented app patterns

## Suggested Student Implementation Order
1. Configure MongoDB connection
2. Implement user registration (hash password)
3. Implement Passport local login
4. Implement session serialize/deserialize
5. Protect routes with middleware
6. Build student CRUD logic
7. Add authorization rules
8. Add validation, flash messages, and error handling

## License
MIT
