import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Traer estadísticas del backend
    fetch("https://tu-backend.com/api/usuarios/estadisticas")
      .then((res) => res.json())
      .then((data) => {
        setEstadisticas(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al traer estadísticas:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h2>Dashboard - Estadísticas de Usuarios</h2>
      {estadisticas ? (
        <ul>
          <li>Total de usuarios: {estadisticas.totalUsuarios}</li>
          <li>Total de administradores: {estadisticas.totalAdmins}</li>
          <li>Total de usuarios comunes: {estadisticas.totalUsuariosComunes}</li>
        </ul>
      ) : (
        <p>No se pudieron cargar las estadísticas</p>
      )}
    </div>
  );
};

export default Dashboard;
