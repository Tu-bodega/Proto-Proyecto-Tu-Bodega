import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        idUser: null,
        correo: null,
        nombre: null,
    });

    const login = (data) => {
        setIsLoggedIn(true);
        setUserData({
            idUser: data.idUser,
            correo: data.correo,
            nombre: data.nombre,
        });
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData({
            idUser: null,
            correo: null,
            nombre: null,
        });
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
