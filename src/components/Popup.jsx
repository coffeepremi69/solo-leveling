const Popup = ({ isOpen, onClose, title, content, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>{title}</h3>
        <div>{content}</div>
        {onConfirm && (
          <button className="task-btn glow" onClick={onConfirm}>
            Complete Task
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;

