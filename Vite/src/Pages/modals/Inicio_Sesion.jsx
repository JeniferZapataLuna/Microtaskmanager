import React, { useState } from 'react';
import '../css/Inicio_Sesion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';
import Modal from './Modal.jsx';

const Inicio_Sesion = ({ closePopup }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const toggleModal = (event) => {
        event.preventDefault(); // Previene la navegación del enlace
        setIsModalOpen(!isModalOpen);
    };
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const openModal = () => {
        setIsModalOpen(true)
    }
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/login', { email, contrasena }, { withCredentials: true });
        setMensaje('Inicio de sesión exitoso');
        login(response.data.token, response.data.cedula);
        navigate('/Manager'); // Redirige a la página de usuarios
      } catch (error) {
        setMensaje(error.response.data.mensaje);
      }
    };

    return (
        <div className='modal_container' id='modal_container'>
            <div className='modal'>
                <span className="close-button" onClick={closePopup}>&times;</span>
                <label type="text" className='til'>Iniciar Sesión</label>
               <form className='Form' onSubmit={handleLogin}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required name='Usuario' className='form Usuario' id='FormU_Usuario' placeholder="Usuario"/>
                    <input type='password' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required name='Contraseña' className='form Contraseña'  id='FormU_Contraseña' placeholder="Contraseña"/>
                    <button type='submit' className='form Ingresar hover-effect'>Ingresar</button>
                </form>
                <div className="main-container">
                {mensaje && <p>{mensaje}</p>}
                <div>¿Necesitas una cuenta? <a href="#" onClick={openModal} className="open-modal-link">Regristrarse</a>
                  {isModalOpen && <Modal closeModal={closeModal} />}</div>
                </div>
            </div>
            </div>
    );
};

export default Inicio_Sesion;

 
 
 
