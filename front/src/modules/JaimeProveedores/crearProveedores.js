import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function CrearProveedor() {

    const [nit, setNit] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const agregarProveedor = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/proveedores/crear', {
            nit: nit,
            nombre: nombre,
            correo: correo,
            direccion: direccion,
            telefono: telefono,
        }).then(() => {
            alert('Proveedor Agregado')
        });
    };
    return (
        <div className="containerProveedores">

            <form onSubmit={agregarProveedor}>

                <label>
                    Nit:
                    <input onChange={(event) => {
                        setNit(event.target.value);
                    }} type='text' ></input>
                </label>

                <label>
                    Nombre:
                    <textarea onChange={(event) => {
                        setNombre(event.target.value);
                    }} type='text' />
                </label>

                <label>
                    Correo:
                    <input onChange={(event) => {
                        setCorreo(event.target.value);
                    }} type='text' ></input>
                </label>

                <label>
                    Direccion:
                    <input onChange={(event) => {
                        setDireccion(event.target.value);
                    }} type='text' ></input>
                </label>

                <label>
                    Telefono:
                    <input onChange={(event) => {
                        setTelefono(event.target.value);
                    }} type='text' ></input>
                </label>

                
                <button className='btn btn-success' type='submit'>Registrar Producto</button>
            </form>

        </div>
    );
}

export default CrearProveedor;