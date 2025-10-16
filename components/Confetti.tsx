
import React from 'react';

const CONFETTI_COUNT = 150;
const COLORS = ['#FFD700', '#FF4500', '#00CED1', '#9370DB', '#32CD32'];

const Confetti: React.FC = () => {
  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      animation: `confetti-fall ${3 + Math.random() * 4}s ${Math.random() * 2}s linear infinite`,
      width: `${Math.floor(Math.random() * 8) + 8}px`,
      height: `${Math.floor(Math.random() * 5) + 5}px`,
      opacity: 0,
    };
    return <div key={i} className="fixed top-0" style={style} />;
  });

  return <div className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">{confetti}</div>;
};

export default Confetti;
