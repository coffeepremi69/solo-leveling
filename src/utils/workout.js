const workouts = {
  0: { // Sunday
    title: 'Active Rest',
    exercises: ['Walk 5km', 'Full body stretch (10min)', 'Foam roll']
  },
  1: { // Monday
    title: 'Full Body',
    exercises: ['Squats 3x12', 'Lunges 3x10/leg', 'Plank 3x30s']
  },
  2: { // Tuesday
    title: 'Full Body + Explosive',
    exercises: ['Jump squats 3x10', 'High knees 3x20s', 'Lunges 3x10/leg']
  },
  3: { // Wednesday
    title: 'Light + Abs',
    exercises: ['Pushups 3x10', 'Leg raises 3x12', 'Plank 3x45s']
  },
  4: { // Thursday
    title: 'Full Body',
    exercises: ['Squats 3x15', 'Pushups 3x12', 'Plank 3x45s']
  },
  5: { // Friday
    title: 'Full Body + Finisher',
    exercises: ['Full body circuit', 'Sprint finisher 6x20s']
  },
  6: { // Saturday
    title: 'HIIT',
    exercises: ['Burpees 4x10', 'Mountain climbers 4x30s', 'Jump rope 5min']
  }
};

export const getTodayWorkout = () => workouts[new Date().getDay()] || workouts[0];

export const getDayName = (day) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];

