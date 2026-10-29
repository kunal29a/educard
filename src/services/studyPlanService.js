import { createInitialPlan } from '../utils/studyPlanUtils.js';

const KEY = 'educard.studyPlan.v1';

export async function getStudyPlan() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return createInitialPlan();

  const sessions = JSON.parse(saved);
  if (!Array.isArray(sessions)) throw new Error('Saved study plan is not a list');
  return sessions;
}

export async function saveStudyPlan(sessions) {
  localStorage.setItem(KEY, JSON.stringify(sessions));
  return sessions;
}
