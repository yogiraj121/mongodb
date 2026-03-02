import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, AlertCircle } from 'lucide-react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tasks on initial load
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchTasks();
      if (res.success) {
        setTasks(res.data);
      }
    } catch (err) {
      setError('Failed to fetch tasks. Please make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await createTask({ title: newTaskTitle });
      if (res.success) {
        // Add task to state directly to avoid re-fetching
        setTasks([res.data, ...tasks]);
        setNewTaskTitle('');
        setError(null);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create task';
      setError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await updateTask(task._id, { completed: !task.completed });
      if (res.success) {
        setTasks(
          tasks.map((t) => (t._id === task._id ? { ...t, completed: res.data.completed } : t))
        );
      }
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List</h1>
        <p>Manage your daily tasks efficiently</p>
      </header>

      <div className="card">
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            className="input-field"
            placeholder="What needs to be done?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={20} /> Add
          </button>
        </form>

        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>
                  {searchQuery
                    ? 'No tasks match your search'
                    : 'Your to-do list is empty. Add a task above!'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="task-item">
                  <div className="task-content">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                    />
                    <span
                      className={`task-title ${task.completed ? 'completed' : ''}`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn-icon danger"
                      onClick={() => handleDeleteTask(task._id)}
                      title="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
