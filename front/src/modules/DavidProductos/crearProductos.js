import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"
import Swal from 'sweetalert2';

function CrearProductos() {
    /*****************************funciones crear datos*****************************/
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioC, setPrecioC] = useState();
    const [precioV, setPrecioV] = useState();
    const [unidades, setUnidades] = useState();
    const [fecha, setFecha] = useState("");
    const [medida, setMedida] = useState();
    const [proveedor, setProveedor] = useState();

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
    };

    const agregarProductos = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/productos/crear', {
            nombre: nombre,
            descripcion: descripcion,
            precioC: precioC,
            precioV: precioV,
            unidades: unidades,
            fecha: fecha,
            medida: medida,
            proveedor: proveedor,
        }).then(() => {
            const msg = "Producto Agregado"
            Swal.fire({
                title: 'EXITO',
                text: msg,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            limpiarCampos();
        }).catch((error) => {
            Swal.fire({
                title: 'Error',
                text: "no se pudo agregar el producto",
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
                            <span className="input-group-text selectP">Unidad de medida:</span>
                            <select value={medida} name="rol" className="form-select" onChange={(event) => { setMedida(event.target.value) }} required>
                                <option value="" hidden>Seleccione la unidad de medida</option>
                                <option value="1">Mililitros</option>
                                <option value="2">Litros</option>
                                <option value="3">Gramos</option>
                                <option value="4">Kilogramos</option>
                            </select>
                        </div>
                    </div>
                    <div className='containerP'>
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
                        <div className="input-group mb-3">
                            <span className="input-group-text">Precio de venta:</span>
                            <input value={precioV} id="precioVentaInput" onChange={(event) => { setPrecioV(event.target.value) }} type="number"
                                className="form-control" placeholder="Precio Venta" required>
                            </input>
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
                <div className='contenedorBtnP'>
                    <button className='btn btn-success' type='submit'>Registrar Producto</button>
                </div>
            </form>

        </div>
    );
}

export default CrearProductos;