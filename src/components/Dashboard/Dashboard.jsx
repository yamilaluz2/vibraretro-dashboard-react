import React, { useEffect, useState } from "react";
import './Dashboard.css';

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5029/User/GetcountUser", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();

        setStatistics({
          totalUsers: data.count,
          activeUsers: data.activeCount,
        });

      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;

  return (
    <div className="dashboard-container">
      <h2>Estadísticas de Usuarios</h2>

      {statistics ? (
        <ul>
          <li>Total de usuarios: {statistics.totalUsers}</li>
          <li>Usuarios activos: {statistics.activeUsers}</li>
        </ul>
      ) : (
        <p>No se pudieron cargar las estadísticas</p>
      )}
    </div>
  );
};

export default Dashboard;

