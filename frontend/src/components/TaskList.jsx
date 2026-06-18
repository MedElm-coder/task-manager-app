import { useState } from "react";

// Temporary sample data — replaced by real API data in Step 10
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
    due_date: null,
  },
  {
    id: 3,
    title: "Deploy app",
    description: "Ship TaskFlow to production",
    status: "done",
    due_date: "2026-07-15",
  },
];

// Maps status codes to readable labels
const STATUS_LABELS = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

function TaskList() {
  const [tasks] = useState(SAMPLE_TASKS);

  return (
    <div className="task-list">
      <h1>TaskFlow</h1>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                <span className={`status status-${task.status}`}>
                  {STATUS_LABELS[task.status]}
                </span>
                {task.due_date && (
                  <small>Due: {task.due_date}</small>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;