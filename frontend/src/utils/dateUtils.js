export function toDateKey(dateInput) {
  const d = new Date(dateInput);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayInputValue() {
  return toDateKey(new Date());
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDueDateLabel(dateInput) {
  const d = dateFromKey(toDateKey(dateInput));
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function formatDueDateShort(dateInput) {
  const d = dateFromKey(toDateKey(dateInput));
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function groupTasksByDueDate(tasks) {
  const groups = new Map();

  tasks.forEach((task) => {
    const key = toDateKey(task.dueDate || task.createdAt);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(task);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKey, groupTasks]) => ({
      dateKey,
      label: formatDueDateLabel(dateKey),
      tasks: groupTasks
    }));
}

export function daysOverdue(dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = today - due;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
