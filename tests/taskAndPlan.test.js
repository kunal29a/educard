import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortTasks,
  formatLocalDate,
  formatLocalDateTime,
  getTaskStatus,
  parseLocalDate,
  parseLocalDateTime,
  validateTaskTitle
} from '../src/utils/taskUtils.js';
import { getPlanSessionsForPeriod, createPlanSession } from '../src/utils/studyPlanUtils.js';
import { buildAnalyticsCsv } from '../src/utils/analyticsUtils.js';
import { getStudent, saveStudent } from '../src/services/profileService.js';

test('local datetime values preserve 5 PM in India through edit round trips', () => {
  const previousTimezone = process.env.TZ;
  process.env.TZ = 'Asia/Kolkata';
  try {
    const scheduled = new Date(2026, 9, 29, 17, 0);
    const inputValue = formatLocalDateTime(scheduled);
    assert.equal(inputValue, '2026-10-29T17:00');

    const displayedAndEdited = parseLocalDateTime(inputValue);
    assert.ok(displayedAndEdited);
    assert.equal(displayedAndEdited.getHours(), 17);
    assert.equal(displayedAndEdited.getMinutes(), 0);
    assert.equal(formatLocalDateTime(displayedAndEdited), inputValue);
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }
});

test('date-only values remain on their selected local calendar day', () => {
  const date = parseLocalDate('2026-01-01');
  assert.ok(date);
  assert.equal(formatLocalDate(date), '2026-01-01');
  assert.equal(date.getHours(), 0);
  assert.equal(parseLocalDate('2026-02-30'), null);
});

test('overdue deadlines are missed while future deadlines retain their day grouping', () => {
  const now = new Date(2026, 9, 29, 16, 0);
  const overdue = { id: 'overdue', title: 'Past', subject: 'Math', deadline: '2026-10-29T15:59', status: 'today' };
  const laterToday = { id: 'today', title: 'Today', subject: 'Math', deadline: '2026-10-29T17:00', status: 'upcoming' };
  const future = { id: 'future', title: 'Future', subject: 'Math', deadline: '2026-10-30T09:00', status: 'today' };

  assert.equal(getTaskStatus(overdue, now), 'missed');
  assert.equal(getTaskStatus(laterToday, now), 'today');
  assert.equal(getTaskStatus(future, now), 'upcoming');
  assert.deepEqual(filterAndSortTasks([overdue, laterToday, future], 'Today', '', 'earliest', now), [laterToday]);
});

test('task filtering and sorting use local deadlines and reject whitespace titles', () => {
  const now = new Date(2026, 9, 29, 8, 0);
  const tasks = [
    { title: 'Later', subject: 'Statistics', deadline: '2026-10-29T12:00', status: 'today' },
    { title: 'Earlier', subject: 'Economics', deadline: '2026-10-29T09:00', status: 'today' }
  ];

  assert.deepEqual(filterAndSortTasks(tasks, 'All', 'stat', 'earliest', now), [tasks[0]]);
  assert.deepEqual(filterAndSortTasks(tasks, 'Today', '', 'earliest', now), [tasks[1], tasks[0]]);
  assert.deepEqual(filterAndSortTasks(tasks, 'Today', '', 'latest', now), [tasks[0], tasks[1]]);
  assert.equal(validateTaskTitle('  \t '), false);
  assert.equal(validateTaskTitle('  Read chapter  '), true);
});

test('study plan periods show the corresponding sessions and add sessions today', () => {
  const now = new Date(2026, 9, 29, 11, 0);
  const sessions = [
    { id: 'today', date: '2026-10-29', time: '10:00', title: 'Today', duration: 25, priority: 'High' },
    { id: 'tomorrow', date: '2026-10-30', time: '10:00', title: 'Tomorrow', duration: 25, priority: 'High' },
    { id: 'last-month', date: '2026-09-30', time: '10:00', title: 'Other month', duration: 25, priority: 'High' }
  ];

  assert.equal(getPlanSessionsForPeriod(sessions, 'Today', now).length, 1);
  assert.equal(getPlanSessionsForPeriod(sessions, 'This week', now).length, 2);
  assert.equal(getPlanSessionsForPeriod(sessions, 'This month', now).length, 2);
  const added = createPlanSession('Review notes', 25, 'Medium', sessions, now);
  assert.equal(added.date, '2026-10-29');
  assert.equal(added.title, 'Review notes');
  assert.equal(getPlanSessionsForPeriod([...sessions, added], 'Today', now).length, 2);
});

test('profile persistence round-trips only profile fields and goals', async () => {
  const previousStorage = globalThis.localStorage;
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
  try {
    const saved = await saveStudent({
      name: 'Taylor Student',
      college: 'Example College',
      major: 'Physics',
      semester: 'Semester 5',
      goals: ['Finish lab report'],
      password: 'must not persist'
    });
    assert.equal(saved.name, 'Taylor Student');
    assert.equal(JSON.stringify([...values.values()]).includes('must not persist'), false);
    assert.deepEqual((await getStudent()).goals, ['Finish lab report']);
    assert.equal((await getStudent()).major, 'Physics');
  } finally {
    if (previousStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previousStorage;
  }
});

test('analytics CSV includes summary, daily hours, and subject results', () => {
  const csv = buildAnalyticsCsv({
    subjects: [{ name: 'Statistics', score: 91, hours: 6.2 }],
    week: [{ day: 'Mon', hours: 2.4, tasks: 5 }],
    tasks: [{ status: 'completed' }, { status: 'today' }]
  });
  assert.match(csv, /"Summary","Tasks completed","1"/);
  assert.match(csv, /"Daily study","Mon","2\.4"/);
  assert.match(csv, /"Subject","Statistics","91%"/);
});
