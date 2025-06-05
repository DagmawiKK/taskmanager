# Task Manager Backend API with MongoDB Atlas

## Overview
This is a RESTful API for a task manager application built with Node.js, Express, and MongoDB Atlas. Tasks are stored in a MongoDB database in the `taskmanager` collection, with logic separated into models, controllers, and routes.

## Project Structure
```
taskmanager/
├── backend/
│    ├── models/
│    │   └── Task.js
│    ├── controllers/
│    │   └── taskController.js
│    ├── routes/
│    │   └── taskRoutes.js
│    ├── index.js
│    ├── .env
├── package.json
├── bun.lock
├── .gitignore
└── README.md
```

## Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB Atlas account (with provided connection string)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install express mongoose cors dotenv
   ```
3. Create a `.env` file in the `backend` folder and add your MongoDB Atlas password:
   ```bash
   echo "DB_PASSWORD=your_mongodb_password_here" > .env
   ```
4. Run the server:
   ```bash
   node index.js
   ```

## API Endpoints
- **GET /api/tasks**
  - Returns all tasks
  - Optional query: `?status=completed` or `?status=pending` to filter tasks
  - Response: `[{ id: number, title: string, completed: boolean }, ...]`

- **POST /api/tasks**
  - Creates a new task
  - Body: `{ "title": string }`
  - Validations: Title must not be empty, must be a string, max 100 characters
  - Response: `201 { id: number, title: string, completed: false }`

- **PUT /api/tasks/:id**
  - Marks a task as completed
  - Validation: ID must be a valid number
  - Response: `200 { id: number, title: string, completed: true }`

- **DELETE /api/tasks/:id**
  - Deletes a task
  - Validation: ID must be a valid number
  - Response: `204 No Content`

## Error Handling
- 400: Invalid input (e.g., empty title, invalid ID, title too long, duplicate ID)
- 404: Task not found
- 500: Server error

## Bonus Features
- **Filtering**: Use `GET /api/tasks?status=completed` or `GET /api/tasks?status=pending` to filter tasks
- **Validations**:
  - Task title must not be empty
  - Task title must be a string
  - Task title must not exceed 100 characters
  - Task ID must be a valid number for PUT and DELETE
- CORS enabled for frontend integration

## Testing
Use tools like Postman or curl to test the API. Examples:
```bash
curl http://localhost:3000/api/tasks
curl http://localhost:3000/api/tasks?status=completed
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"New Task"}'
curl -X PUT http://localhost:3000/api/tasks/1
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Notes
- Tasks are stored in a MongoDB Atlas database (`task-manager` database, `taskmanager` collection).
- The API includes a simple HTML page at `/` to indicate it's running.
- Filtering and validations enhance usability and robustness.
- The MongoDB password is stored securely in a `.env` file.
- Logic is separated into models (Task schema), controllers (business logic), and routes (endpoint definitions).