import { useState, useRef } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"
import Swal from 'sweetalert2';

function CrearProductos() {
    const imgRef = useRef(null);
    /*****************************funciones crear datos*****************************/
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioC, setPrecioC] = useState(0);
    const [precioV, setPrecioV] = useState(0);
    const [unidades, setUnidades] = useState(0);
    const [fecha, setFecha] = useState("");
    const [imagen, setImagen] = useState("");
    const [medida, setMedida] = useState(0);
    const [proveedor, setProveedor] = useState(0);

    //limpiar campos
    const limpiarCampos = () => {
        setNombre("");
        setDescripcion("");
        setPrecioC("");
        setPrecioV("");
        setUnidades("");
        setFecha("");
        setMedida("");
        setProveedor("");
        if (imgRef.current) {
            imgRef.current.value = ''; // Paso 2: Resetea el campo
        }
    };

    const agregarProductos = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('imagen', imagen); // Asegúrate de que 'imagen' sea el archivo seleccionado, no un objeto.
        fd.append('nombre', nombre);
        fd.append('descripcion', descripcion);
        fd.append('precioC', precioC);
        fd.append('precioV', precioV);
        fd.append('unidades', unidades);
        fd.append('fecha', fecha);
        fd.append('medida', medida);
        fd.append('proveedor', proveedor);

        Axios.post('http://localhost:3001/productos/crear', fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                Swal.fire({
                    title: 'Éxito',
                    text: "Producto agregado",
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                limpiarCampos();
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: "No se pudo agregar el producto",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className=" containerProductos">

            <form className=" productosAgregar" onSubmit={agregarProductos}>

                <div className='contenedorFormulari'>
                    <div className='containerP'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Nombre:</span>
                            <input value={nombre} id="nombreInput" onChange={(event) => { setNombre(event.target.value) }} type="text"
                                className="form-control" placeholder="Nombre" aria-label="Username" required>
                            </input>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">descripcion:</span>
                            <input value={descripcion} id="descripcionInput" onChange={(event) => { setDescripcion(event.target.value) }} type="text"
                                className="form-control" placeholder="Descripcion" required>
                            </input>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Precio de compra:</span>
                            <input value={precioC} id="precioCompraInput" onChange={(event) => { setPrecioC(event.target.value) }} type="number"
                                className="form-control" placeholder="Precio Compra" required>
                            </input>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Precio de venta:</span>
                            <input value={precioV} id="precioVentaInput" onChange={(event) => { setPrecioV(event.target.value) }} type="number"
                                className="form-control" placeholder="Precio Venta" required>
                            </input>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">unidades:</span>
                            <input value={unidades} id="unidadesInput" onChange={(event) => { setUnidades(event.target.value) }} type="number"
                                className="form-control" placeholder="Unidades" required>
                            </input>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">fecha:</span>
                            <input value={fecha} id="fechaInput" onChange={(event) => { setFecha(event.target.value) }} type="Date"
                                className="form-control" placeholder="fecha" required>
                            </input>
                        </div>
                    </div>
                    <div className='containerP' id='containerP'>
                        <div className='foraneas'>
                            <div className="input-group mb-4" >
                                <input ref={imgRef}  onChange={(event) => { setImagen(event.target.files[0]) }} type="file"
                                    className="form-control form-control-lg" required>
                                </input>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text selectP">Unidad de medida:</span>
                                <select value={medida} name="rol" className="form-select" onChange={(event) => { setMedida(event.target.value) }} required>
                                    <option value="" hidden>Seleccione la unidad de medida</option>
                                    <option value="1">Mililitros</option>
                                    <option value="2">Litros</option>
                                    <option value="3">Gramos</option>
                                    <option value="4">Kilogramos</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text selectP">Proveedor:</span>
                                <select value={proveedor} name="rol" className="form-select" onChange={(event) => { setProveedor(event.target.value) }} required>
                                    <option value="" hidden>Seleccione proveedor</option>
                                    <option value="1">Bavaria S.A</option>
                                    <option value="2">Colombina S.A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='contenedorBtnP'>
                    <button className='btn btn-success' type='submit'>Registrar Producto</button>
                </div>
            </form>

        </div>
    );
}

export default CrearProductos;