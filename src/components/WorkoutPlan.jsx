import { getTodayWorkout, getDayName } from '../utils/workout.js';

const WorkoutPlan = () => {
  const workout = getTodayWorkout();
  const day = new Date().getDay();

  return (
    <div className="section">
      <h2>Today's Workout ({getDayName(day)})</h2>
      <div className="workout-title glow">{workout.title}</div>
      <ul>
        {workout.exercises.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlan;

