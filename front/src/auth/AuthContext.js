import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(() => {
        // Revisa en el almacenamiento local si el usuario ya está autenticado
        const isAuth = localStorage.getItem('isAuth');
        return isAuth === 'true'; // Asegúrate de comparar con el string 'true'
    });

    const [usuario, setUsuario] = useState(null);

    const login = (nombreUsuario) => {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('usuario', nombreUsuario); // Guarda el nombre del usuario en localStorage
        setUsuario(nombreUsuario);
        setAutenticado(true);
    };
    
    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('usuario'); // Limpia el nombre del usuario de localStorage
        setUsuario(null);
        setAutenticado(false);
    };
    useEffect(() => {
        const nombreUsuario = localStorage.getItem('usuario');
        if (nombreUsuario) {
            setUsuario(nombreUsuario);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ autenticado, usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
