import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const SAMPLE_TASKS = [
  {
    id: 1,
    title: "Learn Laravel API",
    description: "Build the TaskFlow backend",
    status: "in_progress",
    due_date: "2026-07-01",
  },
  {
    id: 2,
    title: "Write tests",
    description: "Cover the CRUD endpoints",
    status: "todo",
    due_date: "",
  },
];

function App() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [editingTask, setEditingTask] = useState(null);

  // CREATE or UPDATE depending on whether we're editing
  const handleSubmit = (formData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...formData } : t
        )
      );
      setEditingTask(null);
    } else {
      const newTask = { id: Date.now(), ...formData };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }
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

      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;