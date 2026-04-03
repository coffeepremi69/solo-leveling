const WeightTracker = ({ weights, onAddWeight }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.weight.value);
    if (value) {
      onAddWeight(new Date().toDateString(), value);
      e.target.reset();
    }
  };

  return (
    <div className="section">
      <h2>Weight Tracker</h2>
      <form onSubmit={handleSubmit} className="weight-form">
        <input type="number" name="weight" placeholder="Enter weight (kg)" step="0.1" required />
        <button type="submit" className="task-btn">Add</button>
      </form>
      {weights.length > 0 && (
        <ul className="weight-list">
          {weights.sort((a,b) => new Date(b.date) - new Date(a.date)).map((w, i) => (
            <li key={i}>{w.date}: {w.value}kg</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeightTracker;

