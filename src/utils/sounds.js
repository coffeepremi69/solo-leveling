let audioContext;

const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
};

export const playXPSound = (type = 'xp') => {
  initAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  if (type === 'levelUp') {
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
  } else {
    osc.frequency.setValueAtTime(600, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
  }

  osc.type = 'sine';
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.5);
};

