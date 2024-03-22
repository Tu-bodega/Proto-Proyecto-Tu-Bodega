import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InformeSalidas = () => {
    const [salidas, setSalidas] = useState([]);

    useEffect(() => {
        obtenerSalidas();
    }, []);

    const obtenerSalidas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/salidas/registro');
            const datosFormateados = response.data.datos.map(salida => {
                // Verifica que los campos productos, descripciones y Unidades existan y sean strings.
                if (typeof salida.productos === 'string' && typeof salida.descripciones === 'string' && typeof salida.Unidades === 'string') {
                    const productosArray = salida.productos.split(', ');
                    const descripcionesArray = salida.descripciones.split('; ');
                    const unidadesArray = salida.Unidades.split('; ');

                    // Crea un array de objetos para los productos con su descripción y unidades correspondientes.
                    const productosDetalle = productosArray.map((producto, index) => ({
                        nombre: producto,
                        descripcion: descripcionesArray[index] || '',
                        unidades: unidadesArray[index] || ''
                    }));

                    // Agrega este array al objeto de salida.
                    return { ...salida, productos: productosDetalle };
                }

                // Si no son strings o alguno no existe, devuelve el objeto de salida sin modificar.
                return salida;
            });

            setSalidas(datosFormateados);
            console.log(salidas);
        } catch (error) {
            console.error('Hubo un error al obtener las salidas:', error);
        }
    };

    return (
        <div className="scrollTabla" style={{ overflowY: 'auto', height: '80%' }}>
            <h1>Informe de Salidas</h1>
            {salidas.map((salida, key) => (
                <div key={key}>
                    <h2>Salida ID: {salida.salidas_id}</h2>
                    <p>Fecha: {new Date(salida.fecha_salida).toLocaleDateString()}</p>
                    <p>Cliente: {salida.nombre_cliente}</p>
                    <p>Empleado: {salida.nombre_empleado}</p>
                    {Array.isArray(salida.productos) && (
                        <ul>
                            {salida.productos.map((producto, indexProducto) => (
                                <li key={indexProducto}>
                                    <p>Producto: {producto.nombre}</p>
                                    <p>Descripción: {producto.descripcion}</p>
                                    <p>Unidades: {producto.unidades}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InformeSalidas;
