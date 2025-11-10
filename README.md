# Job Portal Backend

Welcome! This backend powers a Job Portal where students can find jobs and recruiters can post jobs and manage applications. This README explains the backend structure, main features, data models, controllers, routes, and how to use each API endpoint.

---

## Table of Contents

- [Main Components](#main-components)
- [Key Features](#key-features)
- [Data Models](#data-models)
- [Controllers](#controllers)
- [Routes & Endpoints](#routes--endpoints)
- [Middleware](#middleware)

---

## Main Components

- **Express**: Web server framework for Node.js.
- **Cookie Parser**: Reads cookies from requests (used for authentication).
- **Body Parser**: Reads data sent in requests (JSON/form data).
- **CORS**: Allows the frontend (website) to communicate with the backend.

---

## Key Features

- **User Authentication**: Register, login, logout, and profile management.
- **Company Management**: Recruiters can create and update company profiles.
- **Job Posting**: Recruiters can post, update, and delete jobs.
- **Job Applications**: Students can apply for jobs; recruiters can manage applications.
- **Role-based Access**: Some actions are only for recruiters or authenticated users.
- **Secure Routes**: Protected endpoints using JWT authentication.

---

## Data Models

### User Model
- Stores user info: name, email, phone, password, and role ("recruiter" or "student").
- Profile includes bio, skills, resume, company (for recruiters), and profile photo.

### Company Model
- Stores company details: name, description, website, location, logo.
- Linked to a recruiter (user).

### Job Model
- Stores job details: title, description, requirements, salary, location, job type, position.
- Linked to a company and the recruiter who created it.

### Application Model
- Stores job applications: linked to a job and applicant (user).
- Tracks status: "pending", "rejected", or "accepted".

---

## Controllers

Controllers are the logic behind each feature. They handle requests, process data, and return responses.

### User Controller
- **register**: Register a new user (student or recruiter).
- **login**: Authenticate user and start a session.
- **logout**: End user session.
- **updateProfile**: Update user profile info.

### Company Controller
- **createCompany**: Recruiter creates a new company profile.
- **getCompanyById**: Get details of a specific company.
- **updateCompany**: Update company info (only by owner).
- **listCompanies**: List all companies.

### Job Controller
- **createJob**: Recruiter posts a new job.
- **getJobById**: Get details of a specific job.
- **updateJob**: Update a job (only by creator).
- **deleteJob**: Delete a job (only by creator).
- **listJobs**: List all jobs.

### Application Controller
- **applyForJob**: Student applies for a job.
- **getApplicationById**: Get details of a specific application.
- **updateApplicationStatus**: Recruiter updates application status.
- **listApplications**: List all applications for the logged-in user.

---

## Routes & Endpoints

Below are all API endpoints, what they do, and example requests.

### User Routes

#### Register a new user
- **POST /register**
- Registers a new user (student or recruiter).
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "yourpassword",
    "role": "student" // or "recruiter"
  }
  ```

#### Login
- **POST /login**
- Logs in a user and returns a session cookie.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

#### Logout
- **GET /logout**
- Logs out the user by clearing the authentication cookie.

#### Update user profile
- **POST /profile/update**
- Updates user profile (must be logged in).
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "bio": "A passionate developer.",
    "skills": ["JavaScript", "Node.js"]
  }
  ```

---

### Company Routes

#### Create a new company (Recruiter only)
- **POST /company/create**
- Recruiter creates a new company profile.
- **Request Body:**
  ```json
  {
    "name": "Tech Corp",
    "description": "A leading tech company.",
    "website": "https://techcorp.com",
    "location": "New York",
    "logo": "logo-url"
  }
  ```

#### Get company details
- **GET /company/:id**
- Get details of a company by its ID.

#### Update company info (Owner only)
- **PUT /company/:id/update**
- Update company information (only by owner).
- **Request Body:**
  ```json
  {
    "description": "Updated company description.",
    "website": "https://newsite.com",
    "location": "San Francisco",
    "logo": "new-logo-url"
  }
  ```

#### List all companies
- **GET /companies**
- List all companies.

---

### Job Routes

#### Create a new job (Recruiter only)
- **POST /job/create**
- Recruiter posts a new job.
- **Request Body:**
  ```json
  {
    "title": "Frontend Developer",
    "description": "Develop amazing UIs.",
    "requirements": ["React", "CSS"],
    "salary": 80000,
    "location": "Remote",
    "jobType": "Full-time",
    "position": "Junior"
  }
  ```

#### Get job details
- **GET /job/:id**
- Get details of a job by its ID.

#### Update job (Creator only)
- **PUT /job/:id/update**
- Update a job posting (only by creator).
- **Request Body:**
  ```json
  {
    "title": "Senior Frontend Developer",
    "description": "Lead UI development.",
    "requirements": ["React", "CSS", "Leadership"],
    "salary": 100000,
    "location": "Remote",
    "jobType": "Full-time",
    "position": "Senior"
  }
  ```

#### Delete job (Creator only)
- **DELETE /job/:id/delete**
- Delete a job posting (only by creator).

#### List all jobs
- **GET /jobs**
- List all job postings.

---

### Application Routes

#### Apply for a job (Authenticated user)
- **POST /application/apply**
- Student applies for a job.
- **Request Body:**
  ```json
  {
    "jobId": "job_id_here",
    "resume": "resume-url",
    "coverLetter": "I am excited to apply for this job."
  }
  ```

#### Get application details
- **GET /application/:id**
- Get details of a specific application.

#### Update application status (Recruiter only)
- **PUT /application/:id/status**
- Recruiter updates the status of an application.
- **Request Body:**
  ```json
  {
    "status": "accepted" // or "pending", "rejected"
  }
  ```

#### List all applications for the logged-in user
- **GET /applications**
- List all applications for the logged-in user (student or recruiter).

---

## Middleware

### isAuthenticated Middleware
- Checks if the user is logged in by verifying the JWT token in cookies.
- If the token is missing or invalid, responds with an unauthorized error.
- If valid, attaches the user ID to the request for use in other routes.
- Used to protect routes that require authentication (like updating profile).

---

## Summary

This backend is designed to be simple and easy to use for both students and recruiters. All endpoints are RESTful and secured where needed. Use the example requests above to interact with the API using tools like Postman or from your frontend.

If you’re new to backend APIs, just follow the endpoint descriptions and example requests