import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"

function Productos() {
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
            alert('Producto Agregado')
            leerProductos();
        });
    };
    /*****************************funcion leer datos*****************************/

    const [productosLista, setProductosLista] = useState([]);

    const leerProductos = () => {
        Axios.get("http://localhost:3001/productos/leer").then((response) => {
            setProductosLista(response.data);
        });
    };

    return (
        <div className="containerProductos">

            <form onSubmit={agregarProductos}>

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

                <button className='btn btn-success' type='submit'>Registrar Producto</button>
            </form>

            <div className='listaProductos'>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio de Compra</th>
                            <th>Precio de Venta</th>
                            <th>Unidades</th>
                            <th>Fecha</th>
                            <th>Medida</th>
                            <th>Proveedor</th>
                        </tr>
                    </thead>
                </table>
                <div className="cajaFormu">
                    <table>
                        <tbody>
                            {productosLista.map((valor, key) => (
                                <tr key={key}>
                                    <td>{valor.nombre_producto}</td>
                                    <td>{valor.descripcion_producto}</td>
                                    <td>{valor.precio_compra_producto}</td>
                                    <td>{valor.precio_venta_producto}</td>
                                    <td>{valor.unidades_producto}</td>
                                    <td>{new Date(valor.fecha_producto).toLocaleDateString('es')}</td>
                                    <td>{valor.unidades_medida_id}</td>
                                    <td>{valor.proveedores_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-success' onClick={leerProductos}>Lista</button>
            </div>

        </div>
    );
}

export default Productos;