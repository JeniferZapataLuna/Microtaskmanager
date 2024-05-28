import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Pagina2 from './Pages/pagina2';
import { AuthProvider, useAuth } from './Pages/utils/AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/Manager" element={<ProtectedRoute><Pagina2 /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/Manager" /> : <Home />;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default App;
