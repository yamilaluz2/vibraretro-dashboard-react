import React, { useEffect, useState } from 'react';
import './Users.css';
import Table from '../Table/Table';
import Paginador from '../Paginador/Paginador';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      try {
        const res = await fetch(`http://localhost:5029/User/GetUser?pageNumber=${pageNumber}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Error fetching users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageNumber]);

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleBan = (userId) => {
    navigate(`/ban/${userId}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-container">
      <h2>Usuarios Registrados</h2>
      <Search placeholder="Buscar usuarios..." onSearch={setSearchQuery} />
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <Table users={filteredUsers} onEdit={handleEdit} onBan={handleBan} />
          <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
      )}
    </div>
  );
};

export default Users;
