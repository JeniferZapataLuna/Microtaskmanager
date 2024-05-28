// src/Usuarios.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/api/usuarios', {
          withCredentials: true, // Envia el token del usuario activo
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={logout}>Cerrar Sesión</button>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {usuario.nombre} - {usuario.email} - {usuario.cedula}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
