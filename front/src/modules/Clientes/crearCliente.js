import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Clientes.css"
import Swal from 'sweetalert2';


function CrearCliente() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState();
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState();
    const [direccion, setDireccion] = useState("");

    const lipiarCampos = () => {
        setNombre("");
        setApellido("");
        setDocumento("");
        setCorreo("");
        setTelefono("");
        setDireccion("");
        document.querySelector('.mensajeCorreo').style.display = 'none';

    }

    const validarFormulario = () => {
        const regexCorreo = /^(?=.{1,64}@)[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\.[A-Za-z]{2,})+$/;
        if (!nombre.trim() || !apellido.trim() || !documento.trim() || !correo.trim() || !telefono.trim()  || !direccion.trim()) {
            Swal.fire("Error", "Todos los campos son obligatorios y no deben contener sólo espacios.", "error");
            return false;
        }
        if (!regexCorreo.test(correo)) {
            Swal.fire("Error", "Correo inválido no debe contener espacios ni emojis.", "error");
            document.querySelector('.mensajeCorreo').style.display = 'flex';
            return false;
        }
        return true;
    }

    const agregarCliente = (event) => {
        event.preventDefault();
        if (!validarFormulario()) return;
        Axios.post('http://localhost:3001/clientes/crear', {
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
        }).then(() => {
            lipiarCampos();
            Swal.fire("Éxito", "Cliente agregado con éxito", "success");
        }).catch((error) => {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
        });
    };
    return (
        <div className="containerProductos">

            <form className=" proveedoresAgregar" onSubmit={agregarCliente}>

                <div className="input-group mb-3">
                    <span className="input-group-text">Nombre:</span>
                    <input value={nombre} onChange={(event) => { setNombre(event.target.value) }} type="text"
                        className="form-control" placeholder="Nombre" aria-label="Username" required>
                    </input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Apellido:</span>
                    <input value={apellido} onChange={(event) => { setApellido(event.target.value) }} type="text"
                        className="form-control" placeholder="Apellido" required>
                    </input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Correo:</span>
                    <input value={correo} onChange={(event) => { setCorreo(event.target.value) }} type="text"
                        className="form-control" placeholder="Correo" required>
                    </input>
                </div>
                <div className='mensajeCorreo'>  Por favor, ingresa una dirección de correo electrónico válida, no debe contener espacios ni emojis.</div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Documento:</span>
                    <input value={documento} onChange={(event) => { setDocumento(event.target.value) }} type="number"
                        className="form-control" placeholder="Documento" required>
                    </input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Telefono:</span>
                    <input value={telefono} onChange={(event) => { setTelefono(event.target.value) }} type="number"
                        className="form-control" placeholder="Telefono" required>
                    </input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Direccion:</span>
                    <input value={direccion} onChange={(event) => { setDireccion(event.target.value) }} type="text"
                        className="form-control" placeholder="Direccion" required>
                    </input>
                </div>
                <div className='contenedorBtnP'>
                    <button className='btn btn-success' type='submit'>Registrar Cliente</button>
                </div>
            </form>

        </div>
    );
}

export default CrearCliente;
