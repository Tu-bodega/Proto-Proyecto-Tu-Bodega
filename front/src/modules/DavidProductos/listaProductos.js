import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"

function listaProductos() {
    /*****************************funcion leer datos*****************************/

    const [productosLista, setProductosLista] = useState([]);

    const leerProductos = () => {
        Axios.get("http://localhost:3001/productos/leer").then((response) => {
            setProductosLista(response.data);
        });
    };

    return (
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
    );
}

export default listaProductos;