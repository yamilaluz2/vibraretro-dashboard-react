import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const validateLogin = () => {
    if (user === "admin" && pass === "admin") {
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main className="main-login">
      <div className="form-login">
        <div className="form-common">
          <h2>Iniciar Sesión</h2>
          <input className="form-input" type="text" placeholder="Usuario" value={user} 
          onChange={(e) => setUser(e.target.value)}/>
          <input className="form-input" type="password" placeholder="Contraseña" value={pass}
          onChange={(e) => setPass(e.target.value)}/>
          <button className="form-button button-login"onClick={validateLogin}>Ingresar</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
