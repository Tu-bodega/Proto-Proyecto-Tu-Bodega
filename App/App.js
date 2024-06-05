import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/AuthContext.js';
import Navigation from './auth/Navigation.js';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </PaperProvider>
  );
}
