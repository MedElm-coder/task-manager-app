import { useState, useEffect } from "react";
import api from "./api/axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

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

  const handleSubmit = async (formData) => {
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

  const handleEdit = (task) => setEditingTask(task);

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

  const handleCancel = () => setEditingTask(null);

  // Derived: tasks matching the active filter
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="task-list">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </header>

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancel={handleCancel}
      />

      {error && <p className="error-msg">{error}</p>}

      <FilterBar
        active={filter}
        onChange={setFilter}
        tasks={tasks}
      />

      {loading ? (
        <p className="state-msg">Loading tasks…</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;