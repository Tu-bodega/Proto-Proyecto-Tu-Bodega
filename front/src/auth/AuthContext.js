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
    // Cambio de nombre de la variable a `correoU`
    const [correoU, setCorreoU] = useState(() => localStorage.getItem('correoU')); // Recupera el correoU desde el local storage al inicializar

    const login = (nombreUsuario, correoUsuario) => {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('usuario', nombreUsuario); // Guarda el nombre del usuario en localStorage
        localStorage.setItem('correoU', correoUsuario); // Guarda el correo del usuario en localStorage con el nombre 'correoU'
        setUsuario(nombreUsuario);
        setCorreoU(correoUsuario); // Actualiza el estado `correoU`
        setAutenticado(true);
    };
    
    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('usuario'); // Limpia el nombre del usuario de localStorage
        localStorage.removeItem('correoU'); // Limpia el correo del usuario de localStorage, asegurándote de usar 'correoU'
        setUsuario(null);
        setCorreoU(null); // Limpia el estado `correoU`
        setAutenticado(false);
    };

    useEffect(() => {
        const nombreUsuario = localStorage.getItem('usuario');
        const correoUsuario = localStorage.getItem('correoU');
        if (nombreUsuario && correoUsuario) {
            setUsuario(nombreUsuario);
            setCorreoU(correoUsuario);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ autenticado, usuario, correoU, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
