import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/proveedores_id.css";
import Swal from 'sweetalert2';

function ListaProd() {

    const [productosLista, setProductosLista] = useState([]);

    /*const para utilizar el boton de actualizar produucto*/
    const productoActualizar = (producto) =>{
        console.log("Actualizar producto:", producto);
    };

     /*logica para utilizar el boton de eliminar produucto*/
    const productoEliminar = (producto) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el producto ${producto.nombre_producto}?`);

        if (confirmacion) {
            Axios.delete(`http://localhost:3001/productos/eliminar/${producto.id}`)
                .then((response) => {
                    const msg = "Producto Eliminado"
                    Swal.fire({
                        title: 'EXITO',
                        text: msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    leerProductos();
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: "no se pudo eliminar el producto",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        };
    };

    /* funcion para leer los productos de la base de datos*/
    function leerProductos() {
        Axios.get("http://localhost:3001/productos/leer").then((response) => {
            setProductosLista(response.data);
        });
    }
    /* return para traer la informacion en una tabla*/
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
                                <td>
                                    <button onClick={()=> productoActualizar(valor)}>Actualizar</button>
                                    <button onClick={()=> productoEliminar(valor)}>Eliminar</button>
                                </td>
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
