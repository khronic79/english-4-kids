import React from 'react';
import './black-layer.css';

function BlackLayer({cb}: {cb: () => void}) {
  return (
    <div className="black-layer" onClick={() => {cb()}}></div>
  );
}

export default BlackLayer;