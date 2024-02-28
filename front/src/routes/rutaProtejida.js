import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Ajusta la ruta a tu estructura de directorios

function RutaProtegida() {
    const { autenticado } = useAuth();

    return autenticado ? <Outlet /> : <Navigate to="/" />;
}

export default RutaProtegida;
