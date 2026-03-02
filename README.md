# To-Do List API

This is the backend for a To-Do List application, built with Node.js, Express.js, and MongoDB. It implements a fully functional RESTful API with a structured Controller-Service-Route architecture.

## Architecture

The project is structured into different layers to separate concerns:
- **Routes**: Maps HTTP methods and endpoints to specific Controller functions.
- **Controllers**: Handles incoming HTTP requests, extracts parameters/body, and returns HTTP responses.
- **Services**: Contains the core business logic and interacts with the Mongoose Models.
- **Models**: Defines the schema and data validation for MongoDB.

## Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas connection string

## Setup Instructions

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository_url>
   cd mongo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Ensure you have a `.env` file in the root directory. Modify the variables as needed. Example `.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-list
   ```

4. **Run the application**:
   - For development mode (uses nodemon):
     ```bash
     npm run dev
     ```
   - For standard start:
     ```bash
     npm start
     ```
   (Note: Ensure `start` or `dev` scripts are present in `package.json`, or run `node server.js`).

## API Endpoints

All endpoints are prefixed with `/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Challenges Faced

During the implementation of these APIs, a few challenges were encountered:
1. **Structuring the Codebase**: Moving from a simple monolithic `server.js` file to a structured MVC-like architecture (Routes, Controllers, Services) required careful planning. I addressed this by defining the separation of responsibilities early on: routes just route, controllers manage HTTP context, and services handle Mongoose interactions. This made the code much more readable and maintainable.
2. **Error Handling & Validation**: MongoDB / Mongoose can throw specific errors (like `CastError` for invalid ObjectIDs or `ValidationError` when required limits aren't met). Instead of returning cryptic 500 server errors, I intercepted these specific error names in the Controller's `catch` blocks and returned descriptive 400 Bad Request responses with the corresponding validation messages. This will improve the frontend development experience.
