import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ban.css';

const Ban = () => {
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBan = async () => {
    if (!userId || !reason || !startDate || !endDate || !confirm) {
      alert('Completa todos los campos y confirma el baneo.');
      return;
    }

    setLoading(true);

    const body = { userId, reason, startDate, endDate };

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://tu-backend.com/api/users/ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Usuario ${userId} baneado exitosamente.`);
        navigate('/users'); 
      } else {
        alert(data.error || 'Error al banear al usuario.');
      }
    } catch (error) {
      console.error('Error al banear:', error);
      alert('Ocurrió un error, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ban-container">
      <h2>Banear Usuario</h2>
      <div className="ban-form">
        <label>
          ID del Usuario
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <label>
          Motivo
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <label>
          Fecha Desde
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha Hasta
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label className="confirm-checkbox">
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
          />
          Confirmo el baneo de este usuario
        </label>
        <button onClick={handleBan} disabled={loading}>
          {loading ? 'Procesando...' : 'Banear'}
        </button>
      </div>
    </div>
  );
};

export default Ban;
