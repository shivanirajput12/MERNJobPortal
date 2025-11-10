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
- **register**: Registers a new user. Validates input, ensures email is unique, hashes the password, and saves the user.
- **login**: Authenticates a user. Checks credentials, verifies password and role, creates a JWT token, and sets it in a cookie.
- **logout**: Logs out the user by clearing the authentication cookie.
- **updateProfile**: Updates user profile information (name, email, phone, bio, skills). Validates input and saves changes.

## Company Controller
Handles company-related operations:
- **createCompany**: Creates a new company profile. Only accessible to recruiters.
- **getCompanyById**: Fetches details of a specific company.
- **updateCompany**: Updates company information. Only the owner can update.
- **listCompanies**: Lists all companies.

## Job Controller
Handles job-related operations:
- **createJob**: Creates a new job posting. Only recruiters can post jobs.
- **getJobById**: Fetches details of a specific job.
- **updateJob**: Updates a job posting. Only the creator can update.
- **deleteJob**: Deletes a job posting. Only the creator can delete.
- **listJobs**: Lists all job postings.

## Application Controller
Handles job application operations:
- **applyForJob**: Submits a new application for a job.
- **getApplicationById**: Fetches details of a specific application.
- **updateApplicationStatus**: Updates the status of an application ("pending", "accepted", "rejected").
- **listApplications**: Lists all applications for the logged-in user.

---

# Routes Documentation

## User Routes
- **POST /register**: Registers a new user.
- **POST /login**: Logs in a user.
- **GET /logout**: Logs out the user.
- **POST /profile/update**: Updates user profile (protected by authentication).

## Company Routes
- **POST /company/create**: Creates a new company (recruiter only).
- **GET /company/:id**: Gets details of a company.
- **PUT /company/:id/update**: Updates company info (owner only).
- **GET /companies**: Lists all companies.

## Job Routes
- **POST /job/create**: Creates a new job (recruiter only).
- **GET /job/:id**: Gets details of a job.
- **PUT /job/:id/update**: Updates a job (creator only).
- **DELETE /job/:id/delete**: Deletes a job (creator only).
- **GET /jobs**: Lists all jobs.

## Application Routes
- **POST /application/apply**: Applies for a job (authenticated user).
- **GET /application/:id**: Gets details of an application.
- **PUT /application/:id/status**: Updates application status (recruiter only).
- **GET /applications**: Lists all applications for the logged-in user.

---

# Middleware Documentation

## isAuthenticated Middleware
- Checks if the user is logged in by verifying the JWT token in cookies.
- If the token is missing or invalid, responds with an unauthorized error.
- If valid, attaches the user ID to the request for use in other routes.
- Used to protect routes that require authentication (like updating profile).

---





