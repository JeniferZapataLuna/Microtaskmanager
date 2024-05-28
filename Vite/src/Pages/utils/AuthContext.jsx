import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cedula, setCedula] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCedula(decodedToken.cedula);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('token'); // Remove invalid token
        setIsAuthenticated(false);
        setCedula(null);
      }
    }
  }, []);
  
    
  const login = (token, cedula) => {
    Cookies.set('token', token, { expires: 1/48 });
    setCedula(cedula);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setCedula(cedula);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, cedula, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
