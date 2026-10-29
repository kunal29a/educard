function csvCell(value) {
  const text = String(value);
  const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replaceAll('"', '""')}"`;
}

export function buildAnalyticsCsv({ subjects, week, tasks }) {
  const rows = [
    ['Section', 'Name', 'Value', 'Details'],
    ['Summary', 'Study hours', week.reduce((total, day) => total + day.hours, 0).toFixed(1), 'Hours by day'],
    ['Summary', 'Tasks completed', tasks.filter((task) => task.status === 'completed').length, 'Current task list'],
    ...week.map((day) => ['Daily study', day.day, day.hours, `${day.tasks} tasks`]),
    ...subjects.map((subject) => ['Subject', subject.name, `${subject.score}%`, `${subject.hours} hours`])
  ];
  return rows.map((row) => row.map(csvCell).join(',')).join('\r\n');
}
