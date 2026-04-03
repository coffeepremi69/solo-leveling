const ACHIEVEMENTS = {
  firstXP: 'First Blood: Gained your first XP!',
  streak3: '3-Day Warrior: 3 day streak!',
  xp500: 'Power Level 500!',
};

export const checkAchievements = (state) => {
  const newAchievements = [];

  if (state.xp > 0 && !state.achievements.includes('firstXP')) {
    newAchievements.push('firstXP');
  }
  if (state.streak >= 3 && !state.achievements.includes('streak3')) {
    newAchievements.push('streak3');
  }
  if (state.xp >= 500 && !state.achievements.includes('xp500')) {
    newAchievements.push('xp500');
  }

  return newAchievements;
};

export const getAchievementTitle = (key) => ACHIEVEMENTS[key] || '';

