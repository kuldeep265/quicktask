function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseDueDate(input) {
  if (!input) {
    return startOfDay();
  }

  const d = new Date(input);
  if (Number.isNaN(d.getTime())) {
    return null;
  }

  return startOfDay(d);
}

module.exports = { startOfDay, parseDueDate };
