import { formatDueDateShort, daysOverdue } from "../utils/dateUtils";

function TaskCard({
  task,
  variant = "pending",
  onComplete,
  onDelete,
  onReopen,
  onReschedule
}) {
  const dueLabel = formatDueDateShort(task.dueDate || task.createdAt);
  const overdueDays = variant === "expired" ? daysOverdue(task.dueDate) : 0;

  return (
    <li className={`task-card task-card-${variant}`}>
      <div className="task-card-body">
        {variant === "completed" ? (
          <span className="task-check" aria-hidden="true">
            ✓
          </span>
        ) : (
          <span className={`task-dot ${variant === "expired" ? "is-overdue" : ""}`} aria-hidden="true" />
        )}
        <div className="task-text">
          <p className="task-title">{task.title}</p>
          <p className="task-due">
            {variant === "expired" ? (
              <>
                Due {dueLabel}
                {overdueDays > 0 && (
                  <span className="overdue-badge">
                    {overdueDays} day{overdueDays === 1 ? "" : "s"} overdue
                  </span>
                )}
              </>
            ) : (
              <>Due by {dueLabel}</>
            )}
          </p>
        </div>
      </div>
      <div className="task-actions">
        {variant === "pending" && (
          <button type="button" className="btn-status is-pending" onClick={() => onComplete(task._id)}>
            Mark done
          </button>
        )}
        {variant === "completed" && (
          <button type="button" className="btn-status is-done" onClick={() => onReopen(task._id)}>
            Reopen
          </button>
        )}
        {variant === "expired" && (
          <>
            <button
              type="button"
              className="btn-status is-reschedule"
              onClick={() => onReschedule(task)}
            >
              Reschedule
            </button>
            <button type="button" className="btn-status is-pending" onClick={() => onComplete(task._id)}>
              Mark done
            </button>
          </>
        )}
        <button type="button" className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
