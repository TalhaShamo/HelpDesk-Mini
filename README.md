HelpDesk Mini

HelpDesk Mini is a full-stack MERN application built for a hackathon. It is a simplified, robust ticketing system designed to manage customer support requests, featuring a secure RESTful API and a clean, functional user interface. The system implements a three-tiered Role-Based Access Control (RBAC) system for users, agents, and administrators.
Tech Stack

Category
	

Technology

Frontend
	

React React Router Redux Toolkit Axios Tailwind CSS DaisyUI

Backend
	

Node.js Express.js

Database
	

MongoDB with Mongoose

Auth
	

JSON Web Tokens (JWT) bcryptjs
Features

    User Authentication: Secure user registration and login functionality using JWT.

    Role-Based Access Control (RBAC): Three distinct user roles with different permissions:

        User: Can create and comment on their own tickets.

        Agent: Can view and update the status of any ticket.

        Admin: Has full control, including deleting tickets and managing user roles.

    Ticket Management: Full CRUD functionality for support tickets.

    SLA Timers: Automatic deadline calculation for tickets based on priority.

    Threaded Comments: A complete commenting system on each ticket to serve as a communication channel and historical timeline.

    Robust API: Implements professional-grade features including pagination, rate limiting, idempotency, and optimistic locking.

Local Setup & Installation

To run this project locally, please follow these steps:
1. Backend Setup

# Clone the repository
git clone <your-repo-url>
cd helpdesk-mini/server

# Install dependencies
npm install

# Create a .env file in the /server directory with the following variables:
# PORT=5000
# MONGO_URI=<your_mongodb_connection_string>
# JWT_SECRET=<your_jwt_secret>

# Run the server
npm run server

2. Frontend Setup

# Navigate to the client directory from the root
cd ../client

# Install dependencies
npm install

# Run the React development server
npm run dev

The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.
Architecture Note

The application follows a classic client-server architecture using the MERN stack. The backend is a monolithic RESTful API built with Node.js and Express, responsible for all business logic, database interactions, and authentication. It uses Mongoose to model data for a MongoDB database. Security is a key focus, with JWT handling user sessions and custom middleware enforcing role-based access control (RBAC) for all protected endpoints.

The frontend is a dynamic Single-Page Application (SPA) built with React and Vite. It leverages React Router for navigation and Redux Toolkit for centralized state management, particularly for handling user authentication and ticket data. The UI is styled with Tailwind CSS and the DaisyUI component library for rapid, clean development. Communication with the backend is handled via asynchronous API calls using Axios. This separation of concerns creates a scalable and maintainable codebase.
Test User Credentials

To test the different roles, you can register three separate users. After registration, you can manually update their roles in your MongoDB database (in the users collection) to agent and admin. An already-logged-in admin can also update a user's role from the ticket detail page.

Role
	

Email
	

Password

User
	

user@example.com
	

password123

Agent
	

agent@example.com
	

password123

Admin
	

admin@example.com
	

password123
API Robustness & Core Features
Pagination

The GET /api/tickets endpoint supports pagination to handle large lists of tickets efficiently.

    Query Parameters:

        ?limit=<number>: The number of items to return (default: 10).

        ?offset=<number>: The number of items to skip (default: 0).

    Response Format:

    {
      "items": [...],
      "next_offset": 10
    }

Idempotency

All POST requests for resource creation (POST /api/tickets) support an Idempotency-Key header to prevent accidental duplicate creations. Sending the same request twice with the same key will not create a second resource.

    Header: Idempotency-Key: <a-unique-string-per-request>

Rate Limiting

The API enforces a rate limit of 60 requests per minute per user (IP-based). If the limit is exceeded, the server will respond with a 429 Too Many Requests error.

    Error Response:

    {
      "error": {
        "code": "RATE_LIMIT",
        "message": "Too many requests, please try again after a minute."
      }
    }

Authentication (JWT Flow)

Protected routes require a JSON Web Token (JWT) to be sent in the Authorization header.

    Obtain a token by authenticating against POST /api/users/login.

    For all subsequent requests to protected routes, include the header:

        Authorization: Bearer <your_jwt_token>

API Summary & Examples
User Endpoints

    Register User

        POST /api/users/register (Public)

        Request Body: {"name": "Test User", "email": "test@example.com", "password": "password123"}

        Success Response (201): {"_id": "...", "name": "...", "email": "...", "role": "user", "token": "..."}

    Login User

        POST /api/users/login (Public)

        Request Body: {"email": "test@example.com", "password": "password123"}

        Success Response (200): {"_id": "...", "name": "...", "email": "...", "role": "user", "token": "..."}

    Update User Role

        PATCH /api/users/:id (Private, Admin only)

        Request Body: {"role": "agent"}

        Success Response (200): {"_id": "...", "name": "...", "email": "...", "role": "agent"}

Ticket Endpoints

    Create Ticket

        POST /api/tickets (Private)

        Request Body: {"title": "New Issue", "description": "Details here", "priority": "high"}

        Success Response (201): { "_id": "...", "title": "New Issue", ... }

    Get Tickets

        GET /api/tickets?limit=5&offset=0 (Private)

        Success Response (200): {"items": [...], "next_offset": 5}

    Get Single Ticket

        GET /api/tickets/:id (Private)

        Success Response (200): {"ticket": {...}, "comments": [...]}

    Update Ticket Status

        PATCH /api/tickets/:id (Private, Agent/Admin only)

        Request Body: {"status": "in-progress"}

        Success Response (200): Updated ticket object.

        Conflict Response (409): If the ticket was updated by someone else (optimistic locking).

    Delete Ticket

        DELETE /api/tickets/:id (Private, Admin only)

        Success Response (200): {"success": true, "id": "..."}

    Add a Comment

        POST /api/tickets/:id/comments (Private)

        Request Body: {"text": "This is a new comment."}

        Success Response (201): The new comment object.
