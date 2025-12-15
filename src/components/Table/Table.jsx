import React from 'react';
import './Table.css';
import Button from "../Button/Button";

const Table = ({ users, onEdit, onBan, unBan, showBanActions = true }) => {
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
              <td>{user.userName}</td>
              <td>{user.mail}</td>
              <td>{user.state ? "Baneado" : "Activo"}</td>
              <td className="action-buttons">
                <Button text="Editar" callback={() => onEdit(user.id)} />
                {showBanActions && !user.state && (
                    <Button text="Banear" />
                )}

                {showBanActions && user.state && (
                    <Button text="Desbanear" />
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

