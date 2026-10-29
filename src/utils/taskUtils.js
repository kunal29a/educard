export function formatLocalDateTime(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatLocalDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseLocalDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!match) return null;

  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

export function parseLocalDateTime(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value ?? '');
  if (!match) return null;

  const [, year, month, day, hours, minutes] = match.map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hours &&
    date.getMinutes() === minutes
    ? date
    : null;
}

export function getTaskStatus(task, now = new Date()) {
  if (task.status === 'completed' || task.status === 'missed') return task.status;
  const deadline = parseLocalDateTime(task.deadline);
  if (!deadline) return task.status || 'upcoming';
  if (deadline < now) return 'missed';
  return formatLocalDate(deadline) === formatLocalDate(now) ? 'today' : 'upcoming';
}

export function filterAndSortTasks(tasks, filter = 'All', query = '', sort = 'earliest', now = new Date()) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return tasks
    .filter((task) => filter === 'All' || getTaskStatus(task, now) === filter.toLowerCase())
    .filter((task) => !normalizedQuery || `${task.title} ${task.subject}`.toLocaleLowerCase().includes(normalizedQuery))
    .sort((a, b) => {
      const aDeadline = parseLocalDateTime(a.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;
      const bDeadline = parseLocalDateTime(b.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;
      return (sort === 'latest' ? bDeadline - aDeadline : aDeadline - bDeadline);
    });
}

export function validateTaskTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}
