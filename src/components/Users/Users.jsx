import React, { useEffect, useState} from 'react'
import Grid from '../Grid/Grid';

const Users = () => {
  //const [page, setPage] = useState(1);
  //const [query, setQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@mail.com", admin: true },
    { id: 2, username: "eze", email: "eze@mail.com", admin: false },
    { id: 3, username: "sofi", email: "sofi@mail.com", admin: false },
    { id: 4, username: "yami", email: "yami@mail.com", admin: false },
  ]);

  /*
  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page -1);
  } 

  const find = (evt) => {
    const {value} = evt.target;
    setQuery(value);
    setPage(1);
  }

  const fetchData = async () => {
    try {
      let response = await fetch('');
      let json = await response.json();

      setTotalPage(json.totalPages);
      setUsers(json.content);
    } catch (e) {
      alert("Error al traer las provincias" + e.message);
    } finally {

    }
  }

  useEffect(() => {
    fetchData();
  }, [page, query]);
*/
  return (
    <div>
      <h2>Usuarios Registrados</h2>
      {/* 
      <input type='text' value={query} onChange={find} />
      */}
      <Grid></Grid>
      {/*
      <a className='btn-btn-primary' onClick={previousPage}>Anterior</a>
      <span>{page}</span>
      <a className='btn-btn-primary' onClick={nextPage}>Siguiente</a>
      */}
    </div>
  )
}
export default Users
