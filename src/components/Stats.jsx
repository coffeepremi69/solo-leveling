import { useMemo } from 'react';

const LEVEL_TITLES = [
  'Weak Hunter',
  'Beginner',
  'Disciplined',
  'Fat Burner',
  'Beast Mode',
  'Monarch'
];

const Stats = ({ xp, streak, achievements }) => {
  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);
  const progress = (xp % 100);

  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

  return (
    <div className="stats-panel glow">
      <div className="level-display">
        <h1 className="level">{level}</h1>
        <div className="title">{title}</div>
      </div>
      <div className="xp-bar">
        <div className="progress" style={{width: `${progress}%`}}></div>
      </div>
      <div className="xp-text">XP: {xp} ({Math.floor(xp / 100) * 100 + 100} to next)</div>
      <div className="streak">Streak: {streak} days 🔥</div>
      {achievements.length > 0 && (
        <div className="achievements">
          <h3>Achievements:</h3>
          <ul>
            {achievements.map(a => <li key={a}>✓ {a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stats;

