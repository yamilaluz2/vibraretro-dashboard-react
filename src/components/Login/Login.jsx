import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const validateLogin = async () => {
    if (!username || !password) {
      alert("Ingrese usuario y contraseña");
      return;
    }

    setLoading(true);

    const body = { username, password };

    try {
      const res = await fetch("https://tu-backend.com/api/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok && data.token && data.role) {
        localStorage.setItem("token", data.token);   
        localStorage.setItem("role", data.role);     
        localStorage.setItem("logged", "true");      

        navigate("/dashboard");
      } else {
        alert(data.error || "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al loguear:", error);
      alert("Ocurrió un error de conexión, intenta nuevamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-login">
      <div className="form-login">
        <div className="form-common">
          <img src="/combi.webp" alt="Vibra Retro" className="logo-img" />
          <h1 className="login-title">VIBRA RETRO</h1>
          <h2>Iniciar Sesión como administrador</h2>

          <input
            className="form-input"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="form-button button-login"
            onClick={validateLogin}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;