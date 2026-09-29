# Implementation Guide (Conceptual, No Real Code)

## 1. Goal of This Guide
This document explains how to implement authentication, sessions, authorization, and CRUD in this starter kit **without giving direct implementation code**. Use it as your architecture and execution roadmap.

## 2. High-Level Architecture
The app follows MVC-style organization:
- **Models** define database structure and data rules.
- **Routes** map URLs to controller actions.
- **Controllers** coordinate request flow (input -> model interaction -> response).
- **Middleware** runs before controllers for tasks like authentication/authorization.
- **Views (EJS)** display pages and data.

Flow summary:
1. Browser sends request.
2. Route matches URL.
3. Middleware checks auth/roles.
4. Controller executes business process.
5. Model reads/writes database.
6. Controller returns rendered view or redirect.

## 3. MongoDB + Mongoose Connection Flow
Implementation steps:
1. Create environment variable for MongoDB URI.
2. In `config/db.js`, initialize Mongoose connection once at app startup.
3. Add success and failure handling for connection lifecycle.
4. Prevent server startup if connection is critical and unavailable.

Reasoning:
- Centralized DB connection makes app boot predictable and easier to debug.

## 4. Authentication Concept (Session-Based)
Core concept:
- User logs in once.
- Server stores login state in a session.
- Browser receives session ID cookie.
- On next request, cookie links back to server session.

Result:
- You avoid re-authenticating user on every request manually.

## 5. How bcrypt Works
Purpose:
- Never store raw passwords.

Conceptual flow:
1. During registration, hash password with a work factor (salt rounds).
2. Save only hashed result in database.
3. During login, compare entered password against stored hash.
4. If comparison matches, authenticate user.

Reasoning:
- Hashing protects user credentials even if database leaks.

## 6. How Passport Local Works
Passport Local handles username/email + password strategy.

Conceptual flow:
1. User submits login form.
2. Local strategy receives credentials.
3. Strategy looks up user by email/username.
4. Strategy verifies password with bcrypt compare.
5. If valid, authentication succeeds and user is passed forward.
6. If invalid, login fails with message/redirect.

Then session lifecycle:
- `serializeUser`: store minimal identifier in session.
- `deserializeUser`: fetch user from DB for each authenticated request.

Reasoning:
- Keeps auth logic modular and reusable.

## 7. Register Flow (Step-by-Step)
1. Receive name/email/password/role from request body.
2. Validate required fields and formatting.
3. Check whether user already exists.
4. Hash password with bcrypt.
5. Create and save user.
6. Redirect to login or auto-login flow.
7. Add success/failure flash messages.

## 8. Login Flow (Step-by-Step)
1. Receive email/password.
2. Invoke Passport Local authentication.
3. On success, establish session.
4. Redirect based on role (admin dashboard vs student area).
5. On failure, redirect back with error message.

## 9. Logout Flow (Step-by-Step)
1. Call logout handler.
2. Destroy server-side session.
3. Clear session cookie if needed.
4. Redirect to login/home page.

Reasoning:
- Fully removing session avoids stale authenticated state.

## 10. Protecting Routes with Middleware
### `isAuthenticated`
Use for private pages.
- If session user exists, continue.
- If not, redirect to login.

### `isGuest`
Use for auth pages.
- If user already logged in, redirect to dashboard.
- Otherwise allow access.

Why middleware:
- Reusable gatekeeping logic across many routes.

## 11. Authorization (Role-Based Access)
In `authorizeRoles(...allowedRoles)`:
1. Ensure user is authenticated.
2. Read current user role.
3. Check if role is in allowed list.
4. Allow or deny access.

Use cases:
- Only admins can delete students.
- Teachers can view but not remove.

## 12. CRUD Architecture for Students
### Create
- Validate fields.
- Build student object.
- Save to DB.
- Redirect with success message.

### Read (List + Single)
- Fetch all students for list page.
- Fetch one student by route param for detail page.
- Render EJS with returned data.

### Update
- Validate incoming edits.
- Find by ID.
- Apply changes.
- Save and redirect.

### Delete
- Find by ID.
- Remove record.
- Redirect with result message.

## 13. How Routes, Controllers, and Models Connect
Example conceptual mapping:
- `GET /students` -> route -> auth middleware -> controller list method -> model query -> render `students/list`.
- `POST /students/add` -> route -> auth middleware -> controller create method -> model insert -> redirect.

Reasoning:
- Routes stay clean, controllers stay focused, models encapsulate data shape and DB behavior.

## 14. Form Handling Strategy
For each form page (login/register/add/edit):
1. Define form field names matching expected request body keys.
2. Validate server-side (even if client-side validation exists).
3. Handle validation failures with error feedback.
4. Preserve previous inputs where possible for better UX.

## 15. Session Handling Strategy
Recommended implementation plan:
1. Configure session middleware early in app setup.
2. Use secure cookie settings in production.
3. Store session secrets in environment variables.
4. Optionally use persistent session store for scalability.

## 16. Flash Message Strategy
Suggested conceptual approach:
1. On action result, write success/error message to session.
2. Expose message in middleware to `res.locals`.
3. Render in `views/partials/flash.ejs`.
4. Clear after one display.

## 17. Error Handling Strategy
Plan:
- Add centralized error middleware.
- Use consistent error object structure.
- Separate user-facing messages from internal technical details.
- Keep fallback 404 and 500 views.

## 18. MVC Implementation Roadmap (Recommended Order)
1. Setup environment variables and DB connection.
2. Complete `User` and `Student` schema validations.
3. Implement registration controller flow.
4. Implement Passport Local strategy + session serialization.
5. Implement login/logout flows.
6. Build auth middleware guards.
7. Implement student CRUD controllers.
8. Add role authorization.
9. Connect flash messages and error handling.
10. Refine UI rendering with dynamic data.

## 19. Testing Checklist (Conceptual)
- Register new account with valid inputs.
- Reject duplicate email.
- Login success and failure scenarios.
- Session persists across page refresh.
- Protected routes redirect guests.
- Role-restricted routes block unauthorized users.
- Add/edit/delete student works correctly.
- 404/500 pages render properly.

## 20. Final Notes for Students
- Implement one feature at a time.
- Keep controllers thin and readable.
- Avoid mixing DB logic directly into routes.
- Prefer reusable middleware for repeated checks.
- Commit frequently while implementing each major milestone.

This starter is intentionally logic-light so you can practice full-stack backend engineering with clear structure and professional UI already prepared.
