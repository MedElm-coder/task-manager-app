const STATUS_LABELS = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above.</p>;
  }

  return (
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
              <small>Due: {task.due_date.split("T")[0]}</small>
            )}
          </div>

          <div className="task-buttons">
            <button className="btn btn-small" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button
              className="btn btn-small btn-danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;