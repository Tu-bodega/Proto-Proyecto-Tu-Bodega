import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import Axios from "axios";
import "../../css/Usuarios.css";
import { useAuth } from "../../auth/AuthContext.js";



function ListarUsuarios() {
    //variable global
    const { correoU } = useAuth();
    //formulario actualizacion
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraNueva, setContraNueva] = useState('');
    const [rol, setRol] = useState('');
    const [contraAdmi, setContraAdmi] = useState('');


    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        leerUsuarios();
    };
    const handleShow = () => setShow(true);

    //lista
    const [listaUsuarios, setListaUsuarios] = useState([]);
    useEffect(() => {
        leerUsuarios();
    }, []);

    //editar usuarios
    const editarUser = (dato) => {
        handleShow();
        setNombre(dato.nombre_empleado);
        setApellido(dato.apellido_empleado);
        setCorreo(dato.correo_empleado);
        setRol(dato.rol_empleados_id);
        setId(dato.id);
    };

    //limpiar campos
    const limpiarCampos = () => {
        setNombre("");
        setApellido("");
        setCorreo("");
        setRol("");
        setId("");
        setContraAdmi("");
        setContraNueva("");
    };


    const leerUsuarios = () => {
        Axios.get("http://localhost:3001/empleados/leer")
            .then((response) => {
                setListaUsuarios(response.data);
                limpiarCampos(); 
            })
            .catch((error) => {
                Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
                // Mostrar mensaje al usuario, si es necesario
            });
    };



    const validarFormulario = () => {
        const regexCorreo = /^(?=.{1,64}@)[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\.[A-Za-z]{2,})+$/;
        const regexContra = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        if (!nombre.trim() || !apellido.trim() || !correo.trim() || !contraAdmi.trim()) {
            Swal.fire("Error", "Todos los campos son obligatorios y no deben contener sólo espacios.", "error");
            return false;
        }
        if (!regexCorreo.test(correo)) {
            Swal.fire("Error", "Correo inválido", "error");
            return false;
        }

        if (!regexContra.test(contraNueva)) {
            Swal.fire("Error", "Formato de contraseña incorrecto", "error");
            document.querySelector('.mensajeContra').style.display = 'flex';
            return false;
        }

        return true;
    };

    const actualizar = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        try {
            const response = await Axios.put("http://localhost:3001/empleados/actualizar", {
                id: id, //del usuario a actualizar
                nombre: nombre, //del usuario a actualizar
                apellido: apellido, //del usuario a actualizar
                correo: correo, //del usuario a actualizar
                contra: contraNueva, //del usuario a actualizar
                rol: rol, //del usuario a actualizar
                correoU: correoU, // correo de la cuenta administador como medida de calidacion
                contraAdmi: contraAdmi, //contraseña del admi para validar la actualizacion
            });
            Swal.fire("Éxito", "Usuario actualizado con éxito", "success");
            leerUsuarios();
            handleClose();
            limpiarCampos(); 
        } catch (error) {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
        }
    };

    return (
        <div className="container">
            <div className="container lista" id="lista">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="columnaUno">#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>correo</th>
                            <th>cargo</th>
                            <th className="columnaFinal">opciones</th>
                        </tr>
                    </thead>
                </table>
                <div style={{ overflowY: 'auto', maxHeight: '65%' }}>
                    <table className="table table-striped table-hover contenido" >
                        <tbody>
                            {
                                listaUsuarios.map((dato, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="columnaUno">{dato.id}</td>
                                            <td>{dato.nombre_empleado}</td>
                                            <td>{dato.apellido_empleado}</td>
                                            <td>{dato.correo_empleado}</td>
                                            <td>{dato.rol_empleados_id === 1 ?
                                                <span>Administrador</span> :
                                                <span>cajero</span>}</td>
                                            <td className="columnaFinal">
                                                <div className="filaFinal">
                                                    <button className="botones btnEdit" variant="primary"
                                                        onClick={() => { editarUser(dato); }}>
                                                        <i className='bx bx-edit-alt'></i>
                                                    </button>
                                                    <button
                                                        className="botones btnDele">
                                                        <i className='bx bx-trash'></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button className="btonLista btn btn-success" onClick={leerUsuarios}>listar</button>
            </div>
            <div className="container actualizar" id="formActu">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Actualizar usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container formularioActu">
                        <form>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre:</span>
                                <input value={nombre} id="nombreInput" onChange={(event) => { setNombre(event.target.value) }} type="text"
                                    className="form-control" placeholder="Nombre" aria-label="Username" required>
                                </input>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido:</span>
                                <input value={apellido} id="apellidoInput" onChange={(event) => { setApellido(event.target.value) }} type="text"
                                    className="form-control" placeholder="Apellido" required>
                                </input>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Correo:</span>
                                <input value={correo} id="correoInput" onChange={(event) => { setCorreo(event.target.value) }} type="email"
                                    className="form-control" placeholder="Correo" required>
                                </input>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Contraseña nueva :</span>
                                <input value={contraNueva} id="repetirContrasenaInput" onChange={(event) => { setContraNueva(event.target.value) }} type="password"
                                    className="form-control" placeholder="Su contraseña debe tener entre 8 y 20 caracteres largo, contener
                                    letras y números, y no debe contener espacios, caracteres especiales ni emojis.">
                                </input>
                            </div>
                            <div
                                id="passwordHelpBlock"
                                className="mensajeContra">
                                Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y
                                no debe contener espacios, caracteres especiales ni emojis.
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Rol:</span>
                                <select value={rol} name="rol" className="form-select" onChange={(event) => { setRol(event.target.value) }} required>
                                    <option value="" hidden>Seleccione su rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Cajero</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Contraseña:</span>
                            <input id="contrasenaInput" onChange={(event) => { setContraAdmi(event.target.value) }} type="password"
                                className="form-control" placeholder="contraseña de perfil Administrador" required>
                            </input>
                        </div>
                        <span className="mensajeactu">Para poder efectuar un cambio se debe ingresar la contraseña del perfil administrador</span>
                        <div className="btnActu">
                            <button onClick={actualizar} type="button" className="btn btn-primary">Actualizar</button>
                            <button onClick={handleClose} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}



export default ListarUsuarios;

