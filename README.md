# Backend README

This README lists the main components and features used in the `index.js` file for quick understanding:

## Main Components Used
- **Express**: Used to create the web server.
- **Cookie Parser**: Helps read cookies from requests.
- **Body Parser**: Helps read data sent in requests (not used directly).
- **CORS**: Allows your frontend to talk to the backend.

## Key Features in index.js
- **Express App Initialization**: Starts the server.
- **Route Setup**: Adds a `/home` endpoint for a welcome message.
- **JSON Body Parsing Middleware**: Lets the server read JSON data.
- **URL-Encoded Body Parsing Middleware**: Lets the server read form data.
- **Cookie Parsing Middleware**: Lets the server read cookies.
- **CORS Configuration and Middleware**: Allows requests from your frontend.
- **Port Definition**: Sets the port for the server.
- **Server Listening and Logging**: Starts the server and shows a message.

---

# Models Documentation

## User Model
- Stores user information (name, email, phone, password, role).
- Role can be "recruiter" or "student".
- Profile includes bio, skills, resume, company (for recruiters), and profile photo.
- Used to manage authentication and user details.

## Company Model
- Stores company details (name, description, website, location, logo).
- Linked to a user (owner/recruiter) via `userId`.
- Used to represent companies posting jobs.

## Job Model
- Stores job details (title, description, requirements, salary, location, job type, position).
- Linked to a company and the user who created the job.
- Keeps track of applications for the job.
- Used to list and manage job postings.

## Application Model
- Stores job applications made by users.
- Linked to a job and an applicant (user).
- Tracks application status: "pending", "rejected", or "accepted".
- Used to manage and review job applications.

---

Each model helps organize and connect data for the job portal, making it easy to manage users, companies, jobs, and applications.

---

# Controllers Documentation

## User Controller
Handles user-related operations:

- **register**: Registers a new user. Checks for required fields, ensures email is unique, hashes the password, and saves the user.
- **login**: Authenticates a user. Checks credentials, verifies password and role, creates a JWT token, and sets it in a cookie.
- **logout**: Logs out the user by clearing the authentication cookie.
- **updateProfile**: Updates user profile information (name, email, phone, bio, skills). Validates input and saves changes.

Each function helps manage user accounts, authentication, and profile updates in the job portal.

---

You can add similar documentation for other controllers as needed.


