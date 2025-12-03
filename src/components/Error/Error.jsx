import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error-container">
      <h2>¡Ups! El michi se metió en la caja equivocada...</h2>
      <img src="/michierror.png" alt="Michi 404" className="error-image" />
    </div>
  );
}

export default Error;

