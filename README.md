# To-Do List Full-Stack App

This is a complete To-Do List application, built with a **React** frontend and a **Node.js, Express.js, and MongoDB** backend.

## Project Structure

The project is divided into two main parts:
- **`server/`** (or root): Contains the Node.js backend (RESTful API with a Controller-Service-Route architecture).
- **`client/`**: Contains the React frontend powered by Vite, handling user interaction and state management.

---

## Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas connection string

---

## Backend Setup (Node.js + MongoDB)

1. **Navigate to the root/server directory**:
   ```bash
   cd path/to/backend/folder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file for the backend. Example `.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-list
   ```

4. **Run the backend application**:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:5000`*

---

## Frontend Setup (React + Vite)

1. **Navigate to the `client` directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   The frontend automatically points to `http://localhost:5000/api/tasks`. If you deploy the backend somewhere else, you can create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=https://your-deployed-backend-url.com/api/tasks
   ```

4. **Run the React application**:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

---

## API Endpoints (`/api/tasks`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Challenges Faced

During the implementation of this full-stack application, a few main challenges were encountered:
1. **Structuring the Backend Codebase**: Moving from a simple monolithic `server.js` file to a structured MVC-like architecture (Routes, Controllers, Services) required careful planning. I addressed this by defining the separation of responsibilities early on: routes just route, controllers manage HTTP context, and services handle Mongoose interactions.
2. **Error Handling & Validation on Backend**: MongoDB can throw specific errors (like `ValidationError`). Instead of returning cryptic 500 server errors, I intercepted these specific error names in the Controller's `catch` blocks and returned descriptive 400 Bad Request responses with the corresponding validation messages.
3. **Frontend-Backend Integration (CORS)**: When integrating the React frontend running on port 5173 with the Node backend on port 5000, Cross-Origin Resource Sharing (CORS) errors can block requests. I solved this by proactively installing the `cors` package in the Express application and enabling it via `app.use(cors())`.
4. **State Management in React**: Handling optimistic UI updates and managing asynchronous loading sequences while avoiding layout shift was a priority task. By using Axios inside a robust `try/catch` block within local `App.jsx` methods and appending state immediately to the DOM when responses are successful, the UI feels fast and responsive. 
