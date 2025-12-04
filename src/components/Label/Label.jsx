import React from 'react';
import './Label.css';

const Label = ({ text }) => {
  return (
    <span className="label">
      {text}
    </span>
  );
};

export default Label;
