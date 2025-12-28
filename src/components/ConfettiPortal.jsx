import React from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';

function ConfettiPortal({ width, height, numberOfPieces = 60, style = {}, className }) {
  if (typeof document === 'undefined' || !document.body) return null;
  const baseStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
    overflow: 'visible'
  };
  const merged = { ...baseStyle, ...style };
  return ReactDOM.createPortal(
    <div style={merged} className={className}>
      <Confetti width={width} height={height} numberOfPieces={numberOfPieces} recycle={false} />
    </div>,
    document.body
  );
}

export default ConfettiPortal;
