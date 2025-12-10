import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Ban.css';

const Ban = () => {
  const { userId } = useParams();
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBan = async () => {
    if (!reason || !startDate || !endDate || !confirm) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Completa todos los campos y confirma el baneo.'
      });
      return;
    }

    setLoading(true);

    const body = { userId, reason, startDate, endDate };

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5029/Ban/Ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Usuario baneado',
          text: `Usuario ${userId} baneado exitosamente.`
        });
        navigate('/users'); 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Error al banear al usuario.'
        });
      }
    } catch (error) {
      console.error('Error al banear:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un error, intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ban-container">
      <h2>¿Querés banear al usuario {userId}?</h2> 
      <div className="ban-form">
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


