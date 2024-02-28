import React, { useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom"; 
import "../../css/Plantilla.css";
import "../../css/Login.css";

function FormLogin() {
    // Inicializa los estados y el hook de navegación
    const [rol, setRol] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Inicializa useNavigate para redireccionar al usuario

    const logear = (evento) => {
        evento.preventDefault();
        Axios.post("http://localhost:3001/login/validar", {
            rol: rol,
            correo: correo,
            contra: contra
        }).then(response => {
            // Login exitoso
            login(response.data.usuario); // Cambia el estado a autenticado
            navigate('/Admi'); // Redirecciona al usuario a la ruta de administrador
        }).catch(error => {
            // Manejo de errores
            let mensajeError = "Error al realizar la solicitud.";
            if (error.response) {
                mensajeError = error.response.data.error;
            } else if (error.request) {
                mensajeError = "No se recibió respuesta del servidor.";
            }
            Swal.fire({
                title: 'Error',
                text: mensajeError,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    };
    return (
        <main>
            <form onSubmit={logear} className="containerForm">
                <h2>Login</h2>
                {/* bloque tipo se usuario */}
                <section className="block">
                    <select className="input select" value={rol} required
                        onChange={(event) => { setRol(event.target.value); }}>
                        <option value="" hidden>Seleccione su rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Cajero</option>
                    </select>
                    <i className="bx bxs-user-account" />
                </section>
                {/* bloque correo usuario */}
                <section className="block">
                    <label>
                        <input onChange={(event) => { setCorreo(event.target.value) }}
                            className="input" type="email" placeholder="correo" value={correo} required></input>
                    </label>
                    <i className="bx bxs-user" />
                </section>
                {/* bloque contraseña usuario */}
                <section className="block">
                    <label>
                        <input onChange={(event) => { setContra(event.target.value) }}
                            className="input" type="password" placeholder="contraseña" value={contra} required></input>
                    </label>
                    <i className="bx bxs-lock-alt" />
                </section>
                {/* boton ingresar o */}
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default FormLogin;
