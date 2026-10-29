import { student } from '../data/mockData.js';

const KEY = 'educard.profile.v1';

export async function getStudent() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return student;

  const profile = JSON.parse(saved);
  if (
    typeof profile.name !== 'string' ||
    typeof profile.college !== 'string' ||
    typeof profile.major !== 'string' ||
    typeof profile.semester !== 'string' ||
    !Array.isArray(profile.goals)
  ) {
    throw new Error('Saved profile data is invalid');
  }
  return { ...student, ...profile, goals: profile.goals };
}

export async function saveStudent(profile) {
  const safeProfile = {
    name: String(profile.name ?? ''),
    college: String(profile.college ?? ''),
    major: String(profile.major ?? ''),
    semester: String(profile.semester ?? ''),
    goals: Array.isArray(profile.goals) ? profile.goals.map(String) : []
  };
  localStorage.setItem(KEY, JSON.stringify(safeProfile));
  return safeProfile;
}
