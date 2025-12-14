import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import './Banned.css';

const Banned = () => {
  const [bannedUsers, setBannedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filter = "banned";

  useEffect(() => {
    const fetchBannedUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5029/User/GetUser?filter=${filter}&pageNumber=${pageNumber}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setBannedUsers(data); 
        } else {
          console.error("Error fetching banned users");
        }
      } catch (error) {
        console.error("Error al traer usuarios baneados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannedUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleBan = (userId) => {
    navigate(`/ban/${userId}`);
  };

  const filteredUsers = bannedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.reason && user.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="banned-container">
      <h2>Usuarios Baneados</h2>
      <Search placeholder="Buscar usuarios baneados..." onSearch={setSearchQuery} />
      {loading ? (
        <p>Cargando usuarios baneados...</p>
      ) : (
        <table className="banned-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Email</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Motivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.bannedFrom}</td>
                <td>{user.bannedTo}</td>
                <td>{user.reason}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(user.id)}>Editar</button>
                  <button onClick={() => handleBan(user.id)}>Banear</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Banned;
