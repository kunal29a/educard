import { formatLocalDate, formatLocalDateTime } from './taskUtils.js';

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function session(date, time, title, duration, priority, status = 'upcoming') {
  return {
    id: `${formatLocalDate(date)}-${time}-${title}`,
    date: formatLocalDate(date),
    time,
    title,
    duration,
    priority,
    status
  };
}

export function createInitialPlan(now = new Date()) {
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthDay = (day) => new Date(year, month, Math.min(day, new Date(year, month + 1, 0).getDate()));

  return [
    session(now, '09:00', 'Statistics · Hypothesis testing', 25, 'High', 'completed'),
    session(now, '10:00', 'Data Structures · Binary trees', 45, 'High'),
    session(addDays(now, 1), '13:30', 'Product Design · Critique prep', 40, 'Medium'),
    session(addDays(now, 2), '15:00', 'Economics · Chapter 6', 30, 'Low'),
    session(monthDay(5), '11:00', 'Statistics · Practice review', 30, 'Medium'),
    session(monthDay(15), '14:00', 'Data Structures · Problem review', 45, 'High'),
    session(monthDay(24), '16:00', 'Product Design · Portfolio work', 45, 'Medium')
  ];
}

export function getPlanSessionsForPeriod(sessions, period, now = new Date()) {
  const currentDate = formatLocalDate(now);
  const monthStart = formatLocalDate(new Date(now.getFullYear(), now.getMonth(), 1));
  const monthEnd = formatLocalDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  const weekStartDate = new Date(now);
  const daysSinceMonday = (weekStartDate.getDay() + 6) % 7;
  weekStartDate.setDate(weekStartDate.getDate() - daysSinceMonday);
  const weekEndDate = addDays(weekStartDate, 6);
  const weekStart = formatLocalDate(weekStartDate);
  const weekEnd = formatLocalDate(weekEndDate);

  return sessions
    .filter((item) => {
      if (period === 'Today') return item.date === currentDate;
      if (period === 'This week') return item.date >= weekStart && item.date <= weekEnd;
      return item.date >= monthStart && item.date <= monthEnd;
    })
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

export function createPlanSession(title, duration, priority, sessions, now = new Date()) {
  const todaySessions = sessions.filter((item) => item.date === formatLocalDate(now));
  const lastTime = todaySessions.map((item) => item.time).sort().at(-1);
  const start = lastTime ? parseInt(lastTime.slice(0, 2), 10) + 1 : 9;
  const nextHour = Math.max(start, now.getHours() + 1, 9);
  const planned = new Date(now);
  planned.setHours(nextHour, 0, 0, 0);
  return {
    ...session(planned, formatLocalDateTime(planned).slice(11), title, duration, priority),
    id: crypto.randomUUID()
  };
}
