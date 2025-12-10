import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './User.css';
import Button from '../Button/Button';
import Alert from "../Alert/Alert";

const User = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState('user'); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`https://tu-backend.com/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setRole(data.role);
      } else {
        Alert.error("Error", data.error || "No se pudo obtener el usuario");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.error("Error", "Error al cargar usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const saveUser = async () => {
    if (!user) return;

    setSaving(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`https://tu-backend.com/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      const data = await res.json();

      if (res.ok) {
        await Alert.success("Actualizado", "Usuario actualizado correctamente");
        navigate('/users');
      } else {
        Alert.error("Error", data.error || "No se pudo guardar el usuario");
      }

    } catch (error) {
      console.error("Error saving user:", error);
      Alert.error("Error", "Ocurrió un error al guardar");

    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <div className="user-container">
      <h2>Editar Usuario</h2>
      <div className="user-form">
        <label>
          Nombre:
          <input type="text" value={user.name} disabled />
        </label>

        <label>
          Username:
          <input type="text" value={user.username} disabled />
        </label>

        <label>
          Email:
          <input type="email" value={user.email} disabled />
        </label>

        <label>
          Rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        <Button 
          text={saving ? "Guardando..." : "Guardar"} 
          callback={saveUser} 
        />
      </div>
    </div>
  );
};

export default User;


