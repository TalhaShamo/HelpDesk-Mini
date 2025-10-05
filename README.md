# HelpDesk Mini

HelpDesk Mini is a full-stack MERN application built for a hackathon. It is a simplified, robust ticketing system designed to manage customer support requests, featuring a secure RESTful API and a clean, functional user interface. The system implements a three-tiered Role-Based Access Control (RBAC) system for users, agents, and administrators.

---

## Tech Stack

| Category     | Technology                                                              |
| :----------- | :---------------------------------------------------------------------- |
| **Frontend** | `React` `React Router` `Redux Toolkit` `Axios` `Tailwind CSS` `DaisyUI` |
| **Backend** | `Node.js` `Express.js`                                                  |
| **Database** | `MongoDB` with `Mongoose`                                               |
| **Auth** | `JSON Web Tokens (JWT)` `bcryptjs`                                      |

---

## Features

-   **User Authentication:** Secure user registration and login functionality using JWT.
-   **Role-Based Access Control (RBAC):** Three distinct user roles with different permissions:
    -   **User:** Can create and comment on their own tickets.
    -   **Agent:** Can view and update the status of any ticket.
    -   **Admin:** Has full control, including deleting tickets and managing user roles.
-   **Ticket Management:** Full CRUD functionality for support tickets.
-   **SLA Timers:** Automatic deadline calculation for tickets based on priority.
-   **Threaded Comments:** A complete commenting system on each ticket to serve as a communication channel and historical timeline.
-   **Robust API:** Implements professional-grade features including pagination, rate limiting, idempotency, and optimistic locking.

---

## Local Setup & Installation

To run this project locally, please follow these steps:

### 1. Backend Setup

```bash
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
```

### 2. Frontend Setup

```bash
# Navigate to the client directory from the root
cd ../client

# Install dependencies
npm install

# Run the React development server
npm run dev
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.
