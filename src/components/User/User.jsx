import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './User.css';

const UserRole = () => {
  const { userId } = useParams();
  const [role, setRole] = useState('user'); // estado para el select
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!confirm) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta confirmar',
        text: 'Debes marcar la opción para confirmar el cambio de rol.',
      });
      return;
    }

    const swalConfirm = await Swal.fire({
      title: `¿Cambiar el rol del usuario ${userId}?`,
      text: `Se asignará el rol: ${role}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar rol',
      cancelButtonText: 'Cancelar',
    });

    if (!swalConfirm.isConfirmed) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5029/User/UpdateRol', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ idUser: userId, role }),
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: `El usuario ${userId} ahora tiene el rol ${role}.`,
        });
        navigate('/users');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'No se pudo actualizar el usuario.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar rol:', error);
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
    <div className="user-role-container">
      <h2>Editar Rol del Usuario {userId}</h2>

      <div className="user-role-form">
        <label>
          Seleccioná el rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        <label className="confirm-checkbox">
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
          />
          Confirmo el cambio de rol de este usuario
        </label>

        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Procesando...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
};

export default UserRole;
