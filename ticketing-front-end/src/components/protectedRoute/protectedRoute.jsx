import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    // Verifică dacă există un token de autentificare
    const isAuthenticated = localStorage.getItem('token'); // presupunând că token-ul este stocat în localStorage

    // Dacă este autentificat, returnează componenta cerută, altfel redirecționează către pagina de login
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;