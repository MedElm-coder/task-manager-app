import { useState, useEffect } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "todo",
  due_date: "",
};

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // When an editing task is passed in, load it into the form
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "todo",
        // Laravel returns an ISO datetime; the date input needs YYYY-MM-DD
        due_date: editingTask.due_date
          ? editingTask.due_date.split("T")[0]
          : "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }
    onSubmit(form);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? "Edit Task" : "New Task"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={3}
      />

      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;