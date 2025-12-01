import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {

    /*
    const { userId, } = useParams();
    const {user, setUser} = useState({});
    const [name, setName] = useState("");

    {const saveUser = async () => {
        try {
            let response = await fetch(
                'PUT URL' , (
                method: 'PUT'
            ));
            let json = await response.json();

            if(json.sucess == true) {
                alert("Guardado");
            }
        } catch (e) {
        alert("Error al traer las provincias" + e.message);
        } finally {

        }
    }

    const modifyName = (evt) => {
        const {value} = evt.target;
        setName(value);
    }


    const fetchUser = async () => {
        try {
            let response = await fetch('');
            let json = await response.json();

            setUser(json.content);
            setName(json.content.nombre);
        } catch (e) {
        alert("Error al traer las provincias" + e.message);
        } finally {

        }
    }

    useEffect(() => {
        fetchUser();
      }, []);
      */

    return (
        <>
            {/*
            <div className='card'>
                <input type="text" value={name} onChange={modifyName} />
            </div>
            <a className='btn btn-primary' onClick={saveUser}>GUARDAR</a>
            */}
        </>
    );
}

export default User
