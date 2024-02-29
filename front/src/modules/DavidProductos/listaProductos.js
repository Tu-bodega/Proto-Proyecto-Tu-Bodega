import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css";

function ListaProductos() {
    const [productosLista, setProductosLista] = useState([]);

    function leerProductos() {
        Axios.get("http://localhost:3001/productos/leer").then((response) => {
            setProductosLista(response.data);
        });
    }

    return (
        <div className='listaProductos'>
            
            <div className="cajaFormu">
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
                            <th>actualizar/eliminar</th>
                        </tr>
                    </thead>
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
            <button className="btnLeer" onClick={leerProductos}>Lista</button>
        </div>
    );
}

export default ListaProductos;
