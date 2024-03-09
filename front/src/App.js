import React from 'react';
import { AuthProvider } from './auth/AuthContext.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RutaProtegida from './routes/rutaProtejida.js';
import Login from './modules/Login/Login';
import Admi from './modules/Admi/interfazAdmi';
import Caja from './modules/Cajero/interfazCajero.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route element={<RutaProtegida/>}>
            <Route path="/Admi" element={<Admi />} />
            <Route path="/Caja" element={<Caja />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

