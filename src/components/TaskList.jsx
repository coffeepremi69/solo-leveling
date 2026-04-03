const TaskList = ({ tasks, onComplete }) => {
  const handleComplete = (task) => {
    if (!task.completed) {
      onComplete(task);
    }
  };

  return (
    <div className="task-grid">
      {tasks.map((task, i) => (
        <button 
          key={i}
          className={`task-btn ${task.completed ? 'completed' : ''}`}
          onClick={() => handleComplete(task)}
          disabled={task.completed}
        >
          {task.name} 
          {task.completed ? ' ✓' : ` (+${task.xp} XP)`}
        </button>
      ))}
    </div>
  );
};

export default TaskList;

