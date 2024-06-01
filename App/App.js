import React from 'react';
import { AuthProvider } from './context/AuthContext.js';
import Navigation from './auth/Navigation.js';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
