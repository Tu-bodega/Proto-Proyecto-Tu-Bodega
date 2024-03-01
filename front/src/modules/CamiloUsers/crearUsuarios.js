import "../../css/Usuarios.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import  Axios  from "axios";

function CrearUsuario() {
    const [nombre,setNombre] = useState("");
    const [apellido,setApellido] = useState("");
    const [contra,setContra] = useState("");
    const [contraDos,setContraDos] = useState("");
    const [correo,setCorreo] = useState("");
    const [rol,setRol] = useState(0);

    const agregar = (e)=>{
        e.preventDefault();
        Axios.post("http://localhost:3001/empleados/crear",{
            nombre:nombre,
            apellido:apellido,
            contra:contra,
            correo:correo,
            rol:rol,
        }).then(()=>{
            alert("Usuario agregado")
        });
    };
    return(
        <div className="containerUsers">
            <form onSubmit={agregar}>

                <label> Nombre:
                    <input onChange={(event)=>{setNombre(event.target.value)}} type="text"></input>
                </label>

                <label> Apellido:
                    <input onChange={(event)=>{setApellido(event.target.value)}} type="text"></input>
                </label>

                <label> Contraseña:
                    <input onChange={(event)=>{setContra(event.target.value)}} type="text"></input>
                </label>

                <label> Repetir Contraseña:
                    <input onChange={(event)=>{setContraDos(event.target.value)}} type="text"></input>
                </label>

                <label> Correo:
                    <input onChange={(event)=>{setCorreo(event.target.value)}} type="text"></input>
                </label>

                <label> Rol:
                    <input onChange={(event)=>{setRol(event.target.value)}} type="number"></input>
                </label>

                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default CrearUsuario;