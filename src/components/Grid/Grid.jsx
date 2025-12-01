import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import './Grid.css';
import Button from "../Button/Button";

const Grid = () => {
    const [users, setUsers] = useState([
        { id: 1, username: "admin", email: "admin@mail.com", admin: true },
        { id: 2, username: "eze", email: "eze@mail.com", admin: false },
        { id: 3, username: "sofi", email: "sofi@mail.com", admin: false },
        { id: 4, username: "yami", email: "yami@mail.com", admin: false },
        ]);

    return (
        <div>
            <Table className='custom-table'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre de usuario</th>
                    <th>Correo electrónico</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody> 
                {users.map((user) => {
                    return (
                        <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button text="Editar" to={`/user/${user.id}`} />
                            <Button text="Banear" onClick={() => alert("Banear usuario " + user.id)} />
                            {/*
                            <a className='btn-btn-primary' href={`/user/${user.id}`}>Editar</a>
                            <a className='btn-btn-primary' href={`/user/${user.id}`}>Banear</a>
                            */}
                        </td>  
                        </tr>
                    )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Grid
