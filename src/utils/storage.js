const STORAGE_KEY = 'soloLevelingState';
const LAST_RESET_KEY = 'soloLevelingLastReset';

export const loadState = () => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = new Date().toDateString();

    if (state && lastReset === today) {
      return JSON.parse(state);
    } else {
      // Reset daily
      localStorage.setItem(LAST_RESET_KEY, today);
      return {
        xp: state ? JSON.parse(state).xp || 0 : 0,
        tasks: getDefaultTasks(),
        streak: lastReset ? calculateStreak(lastReset) : 0,
        weights: [],
        achievements: [],
      };
    }
  } catch {
    return {
      xp: 0,
      tasks: getDefaultTasks(),
      streak: 0,
      weights: [],
      achievements: [],
    };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const getDefaultTasks = () => ([
  { name: 'Walk 4km', xp: 20, completed: false },
  { name: 'Workout', xp: 25, completed: false },
  { name: 'Calorie deficit', xp: 30, completed: false },
  { name: 'Drink water', xp: 10, completed: false },
  { name: 'Sleep 6.5+ hours', xp: 15, completed: false },
  { name: 'Wrist rehab', xp: 25, completed: false },
]);

const calculateStreak = (lastReset) => {
  // Simplified streak calc - increment if active previous day
  try {
    const prevDate = new Date(lastReset);
    const today = new Date();
    const diffDays = Math.floor((today - prevDate) / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? 1 : 0;
  } catch {
    return 0;
  }
};

export { getDefaultTasks };

