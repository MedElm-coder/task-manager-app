import { useState, useEffect } from "react";
import api from "./api/axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks once on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks. Is the Laravel server running?");
    } finally {
      setLoading(false);
    }
  };

  // CREATE or UPDATE
  const handleSubmit = async (formData) => {
    // Normalize empty due_date to null so Laravel accepts it
    const payload = { ...formData, due_date: formData.due_date || null };

    try {
      if (editingTask) {
        const res = await api.put(`/tasks/${editingTask.id}`, payload);
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? res.data : t))
        );
        setEditingTask(null);
      } else {
        const res = await api.post("/tasks", payload);
        setTasks((prev) => [res.data, ...prev]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to save task. Check the fields and try again.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTask && editingTask.id === id) setEditingTask(null);
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="task-list">
      <h1>TaskFlow</h1>

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancel={handleCancel}
      />

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p>Loading tasks…</p>
      ) : (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;