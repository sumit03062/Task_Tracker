
# Task Tracker Project

A project management application built with React, TypeScript, Express.js, and MongoDB.

## Project Structure

- `server/` - Express.js and MongoDB backend
- `src/` - React frontend

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Return to the project root and install dependencies:
   ```bash
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:8080

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `POST /api/projects` - Create a new project (protected)
- `PUT /api/projects/:id` - Update a project (protected)
- `DELETE /api/projects/:id` - Delete a project (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:projectId` - Get tasks for a specific project (protected)
- `POST /api/tasks` - Create a new task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)

## Features

- User authentication with JWT
- Create and manage up to 4 projects per user
- Create, update, and delete tasks within projects
- Track task status (TODO, IN_PROGRESS, REVIEW, COMPLETED)
- Responsive UI built with React and Tailwind CSS
#   T a s k _ T r a c k e r 
 
 #   T a s k _ T r a c k e r 
 
 
