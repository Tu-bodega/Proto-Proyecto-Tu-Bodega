import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"
import Swal from 'sweetalert2';

function CrearProductos() {
    /*****************************funciones crear datos*****************************/
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioC, setPrecioC] = useState(0);
    const [precioV, setPrecioV] = useState(0);
    const [unidades, setUnidades] = useState(0);
    const [fecha, setFecha] = useState("");
    const [medida, setMedida] = useState(0);
    const [proveedor, setProveedor] = useState(0);

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
            });
        });
    };
    return (
        <div className="containerProductos">

            <form className="productosAgregar"onSubmit={agregarProductos}>

                <label>
                    Nombre:
                    <input onChange={(event) => {
                        setNombre(event.target.value);
                    }} type='text' ></input>
                </label>

                <label>
                    Descripcion:
                    <textarea onChange={(event) => {
                        setDescripcion(event.target.value);
                    }} type='text' />
                </label>

                <label>
                    Precio de compra:
                    <input onChange={(event) => {
                        setPrecioC(event.target.value);
                    }} type='number' ></input>
                </label>

                <label>
                    Precio de venta:
                    <input onChange={(event) => {
                        setPrecioV(event.target.value);
                    }} type='number' ></input>
                </label>

                <label>
                    Unidades:
                    <input onChange={(event) => {
                        setUnidades(event.target.value);
                    }} type='number' ></input>
                </label>

                <label>
                    Fecha:
                    <input onChange={(event) => {
                        setFecha(event.target.value);
                    }} type='date' ></input>
                </label>

                <label>
                    Unidad de Medida ID:
                    <input onChange={(event) => {
                        setMedida(event.target.value);
                    }} type='number' ></input>
                </label>

                <label>
                    Proveedor ID:
                    <input onChange={(event) => {
                        setProveedor(event.target.value);
                    }} type='number' ></input>
                </label>

                <button className='btnRegistrar' type='submit'>Registrar Producto</button>
            </form>

        </div>
    );
}

export default CrearProductos;