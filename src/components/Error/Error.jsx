import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button';
import './Error.css';

const Error = () => {

  const navigate = useNavigate();

  const handleGoback = () => {
    navigate(-1); 
  };

  return (
    <div className="error-container">
      <h2>404: No pudimos reproducir esta página. Rebobiná y volvé a intentarlo.</h2>
      <img src="/cassette.png" alt="Cassete 404" className="error-image" />
      <Button text="Volver" callback={handleGoback} />
    </div>
  );
}

export default Error;

