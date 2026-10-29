import { initialTasks } from '../data/mockData';
const KEY='educard.tasks.v1';
export async function getTasks(){const saved=localStorage.getItem(KEY);if(!saved)return initialTasks;const tasks=JSON.parse(saved);if(!Array.isArray(tasks))throw new Error('Saved tasks are not a list');return tasks}
export async function saveTasks(tasks){localStorage.setItem(KEY,JSON.stringify(tasks));return tasks}
