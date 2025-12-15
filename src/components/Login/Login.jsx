import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import './Login.css';

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const isDashboard= true;

  const validateLogin = async () => {
    if (!mail || !password) {
      Alert.error("Campos incompletos", "Ingrese usuario y contraseña");
      return;
    }

    setLoading(true);

    const body = { mail, password, isDashboard };

    try {
      const res = await fetch("http://localhost:5029/User/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);        
        localStorage.setItem("logged", "true");

        await Alert.success(
          "Bienvenido",
          "Has iniciado sesión correctamente"
        );

        navigate("/dashboard");
      } else {
        Alert.error("Login fallido", data.message || "Usuario o contraseña incorrectos");
      }

    } catch (error) {
      console.error("Error al loguear:", error);
      Alert.error("Error de conexión", "Ocurrió un error de conexión, intenta nuevamente");

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
          <h2>Iniciar sesión como administrador</h2>

          <input
            className="form-input"
            type="text"
            placeholder="Correo Electronico"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />

          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            text={loading ? "Ingresando..." : "Ingresar"} 
            callback={validateLogin} 
            type="button" 
            disabled={loading} 
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
