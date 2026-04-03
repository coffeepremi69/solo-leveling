const BossBattle = ({ xp, onFight }) => {
  const canFight = xp >= 50;

  return (
    <div className="section glow">
      <h2>⚔️ Boss Battle</h2>
      <p>Requires 50 XP to fight</p>
      <button 
        className={`task-btn ${canFight ? 'glow' : ''}`} 
        onClick={() => onFight()}
        disabled={!canFight}
      >
        {canFight ? 'Fight Boss! 💥' : 'Too weak...'}
      </button>
    </div>
  );
};

export default BossBattle;

