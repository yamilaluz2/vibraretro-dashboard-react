import './Button.css';
import React from 'react';

const Button = ({text, callback, type = "button"}) => {
  
  return (
    <button className="retro-btn" onClick={callback} type={type}>
      {text}
    </button>
  )
}

export default Button;
