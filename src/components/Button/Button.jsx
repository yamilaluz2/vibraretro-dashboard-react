import './Button.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Button = ({ text, to, onClick, color = "orange" }) => {
  
  if (to) {
    return (
      <Link className={`action-btn ${color}`} to={to}>
        {text}
      </Link>
    );
  };

  return (
    <button className={`action-btn ${color}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
;
