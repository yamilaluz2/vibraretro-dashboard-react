import React from 'react';
import './Table.css';
import Button from "../Button/Button";

const Table = ({ users, onEdit, onBan }) => {
  return (
    <div className="table-container">
      <table className='custom-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Username</th>
            <th>Correo electrónico</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.banned ? "Baneado" : "Activo"}</td>
              <td className="action-buttons">
                <Button text="Editar" callback={() => onEdit(user.id)} />
                <Button text="Banear" callback={() => onBan(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

