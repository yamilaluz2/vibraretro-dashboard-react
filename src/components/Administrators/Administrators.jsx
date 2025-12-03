import React, { useEffect, useState } from 'react';
import './Administrators.css';
import Table from '../Table/Table';
import Paginador from '../Paginador/Paginador';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import './Administrators.css';

const Administrators = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      try {
        const res = await fetch(`https://tu-backend.com/api/users?page=${pageNumber}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          const adminUsers = data.users.filter(u => u.role === "admin");
          setAdmins(adminUsers);
        } else {
          console.error("Error fetching admins");
        }
      } catch (error) {
        console.error("Error al traer administradores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [pageNumber]);

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleBan = (userId) => {
    navigate(`/ban/${userId}`);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="administrators-container">
      <h2>Administradores</h2>
      <Search placeholder="Buscar administradores..." onSearch={setSearchQuery} />
      {loading ? (
        <p>Cargando administradores...</p>
      ) : (
        <>
          <Table users={filteredAdmins} onEdit={handleEdit} onBan={handleBan} />
          <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
      )}
    </div>
  );
};

export default Administrators;

