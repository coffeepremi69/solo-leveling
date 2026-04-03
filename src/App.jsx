import { useState, useEffect } from 'react';
import Stats from './components/Stats';
import TaskList from './components/TaskList';
import WorkoutPlan from './components/WorkoutPlan';
import WeightTracker from './components/WeightTracker';
import BossBattle from './components/BossBattle';
import Timer from './components/Timer';
import Popup from './components/Popup';
import { loadState, saveState, getDefaultTasks } from './utils/storage';
import { checkAchievements } from './utils/achievements';
import { hasDailyActivity } from './utils/activity';
import { playXPSound } from './utils/sounds';
import './index.css'; // Global styles

const LEVEL_TITLES = [
  'Weak Hunter', 
  'Beginner', 
  'Disciplined', 
  'Fat Burner', 
  'Beast Mode', 
  'Monarch'
];

const QUOTES = [
  'Level up your life!',
  'Every task completed is power gained.',
  'From E-rank to Monarch.',
  'Discipline is your greatest weapon.',
  'The grind never stops.'
];

const TASK_CONTENTS = {
  'Walk 4km': 'Walk briskly for 4km. Track with phone app.',
  'Workout': 'See todays workout plan below.',
  'Calorie deficit': 'Eat 500 calories below maintenance. Track food.',
  'Drink water': '3L+ water today. Stay hydrated hunter!',
  'Sleep 6.5+ hours': 'Quality sleep. Track with app.',
  'Wrist rehab': 'Wrist circles 2min, light curls 3x10, ball squeeze 2min, heat therapy.'
};

const WRIST_REHAB_CONTENT = `
<h3>Wrist Rehab Protocol</h3>
<ul>
  <li>Wrist circles: 2 minutes each direction</li>
  <li>Light curls: 3 sets x 10 reps (1-2kg)</li>
  <li>Ball squeeze: 2 minutes continuous</li>
  <li>Heat therapy: 10 minutes warm pack</li>
</ul>
`;

function App() {
  const [state, setState] = useState({ xp: 0, tasks: [], streak: 0, weights: [], achievements: [] });
  const [popup, setPopup] = useState({ show: false, task: null });
  const [quote, setQuote] = useState('');

  // Load state on mount
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  // Save state on change
  useEffect(() => {
    if (state.xp !== undefined) saveState(state);
  }, [state]);

  const completeTask = (task) => {
    setPopup({ show: true, task });
  };

  const confirmComplete = () => {
    const { task } = popup;
    setState(prev => {
      const newState = {
        ...prev,
        xp: prev.xp + task.xp,
        tasks: prev.tasks.map(t => t.name === task.name ? { ...t, completed: true } : t),
        streak: hasDailyActivity(newState.tasks) ? 1 : 0  // Set streak to 1 if any task completed today
      };
      // Check achievements
      const newAch = checkAchievements(newState);
      newState.achievements = [...newState.achievements, ...newAch];
      playXPSound();
      setPopup({ show: false });
      return newState;
    });
  };

  const addWeight = (date, value) => {
    setState(prev => ({
      ...prev,
      weights: [...prev.weights, { date, value }]
    }));
  };

  const fightBoss = () => {
    if (state.xp >= 50) {
      setState(prev => ({ ...prev, xp: prev.xp - 50 }));
      playXPSound('levelUp');
      alert('Boss defeated! 💀 Victory!');
    }
  };

  const timerComplete = () => {
    alert('Timer complete! Great workout!');
  };

  const level = Math.floor(state.xp / 100) + 1;
  const achievements = state.achievements;

  return (
    <div className="app-container">
      <div className="banner glow">Solo Leveling System ⚡</div>
      <div className="quote">"{quote}"</div>

      <Stats xp={state.xp} streak={state.streak} achievements={achievements} />

      <TaskList tasks={state.tasks.length ? state.tasks : getDefaultTasks()} onComplete={completeTask} />

      <WorkoutPlan />

      <WeightTracker weights={state.weights} onAddWeight={addWeight} />

      <BossBattle xp={state.xp} onFight={fightBoss} />

      <Timer onComplete={timerComplete} />

      <Popup 
        isOpen={popup.show} 
        onClose={() => setPopup({ show: false })} 
        title={popup.task ? popup.task.name : ''}
        content={popup.task ? TASK_CONTENTS[popup.task.name] || WRIST_REHAB_CONTENT : ''}
        onConfirm={popup.task ? confirmComplete : null}
      />
    </div>
  );
}

export default App;

