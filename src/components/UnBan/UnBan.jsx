import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './UnBan.css';

const UnBan = () => {
  const { userId } = useParams();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUnban = async () => {
    if (!confirm) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta confirmar',
        text: 'Debes marcar la opción para confirmar el desbaneo.',
      });
      return;
    }

    const swalConfirm = await Swal.fire({
      title: `¿Desbanear al usuario ${userId}?`,
      text: "Esta acción levantará el ban y el usuario podrá volver a ingresar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, desbanear',
      cancelButtonText: 'Cancelar',
    });

    if (!swalConfirm.isConfirmed) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5029/Ban/UnBan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: '¡Desbaneado!',
          text: `El usuario ${userId} fue desbaneado correctamente.`,
        });
        navigate('/users');

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Error al desbanear al usuario.',
        });
      }
    } catch (error) {
      console.error('Error al desbanear:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un error, intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unban-container">
      <h2>¿Querés desbanear al usuario {userId}?</h2>

      <div className="unban-form">
        <label className="confirm-checkbox">
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
          />
          Confirmo el desbaneo de este usuario
        </label>

        <button onClick={handleUnban} disabled={loading}>
          {loading ? 'Procesando...' : 'Desbanear'}
        </button>
      </div>
    </div>
  );
};

export default UnBan;
