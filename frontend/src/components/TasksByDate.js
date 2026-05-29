import { groupTasksByDueDate } from "../utils/dateUtils";
import TaskCard from "./TaskCard";

function TasksByDate({ tasks, variant, onComplete, onDelete, onReopen, onReschedule }) {
  const groups = groupTasksByDueDate(tasks);

  return (
    <div className="date-groups">
      {groups.map((group) => (
        <section key={group.dateKey} className="date-group" aria-labelledby={`date-${group.dateKey}`}>
          <h2 id={`date-${group.dateKey}`} className="date-group-heading">
            <span className="date-group-icon" aria-hidden="true">
              {variant === "expired" ? "!" : "◷"}
            </span>
            {group.label}
            <span className="date-group-count">
              {group.tasks.length} {group.tasks.length === 1 ? "task" : "tasks"}
            </span>
          </h2>
          <ul className="task-grid">
            {group.tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                variant={variant}
                onComplete={onComplete}
                onDelete={onDelete}
                onReopen={onReopen}
                onReschedule={onReschedule}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default TasksByDate;
