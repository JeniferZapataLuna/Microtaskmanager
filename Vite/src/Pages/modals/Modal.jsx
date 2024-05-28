import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Modal.css';

const Modal = ({ closeModal }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        cedula: '',
        contrasena: '',
        Ccontrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.contrasena !== formData.Ccontrasena) {
            alert('Las contraseñas no coinciden');
            return;
        }else{
            try {
                const response = await axios.post('/api/registrar', {
                    nombre: formData.nombre,
                    email: formData.email,
                    cedula: formData.cedula,
                    contrasena: formData.contrasena
                });
                console.log(response.data)
                alert('Usuario registrado con éxito');
                closeModal()
                navigate('/'); // Redirige a la página principal
              } catch (error) {
                console.error('Error al registrar el usuario:', error);
                alert('Error al registrar el usuario');
              }
        }
        
      };
      return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <label className='til2'>Crea un Usuario</label>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        className='form Nombre'
                        placeholder='Nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='form Email'
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="cedula"
                        id="cedula"
                        className='form Cedula'
                        placeholder="Cédula"
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="contrasena"
                        id="contrasena"
                        className='form Contraseña'
                        placeholder="Contraseña"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="Ccontrasena"
                        id="Ccontrasena"
                        className='form Contraseña'
                        placeholder="Verificar Contraseña"
                        value={formData.Ccontrasena}
                        onChange={handleChange}
                        required
                    />
                    <button type='submit' className='form Registrar hover-effect'>Registrarse</button>
                </form>
                <p>Volver a la pagina principal <a href='/' className='open-modal-link' onClick={closeModal}>Inicio</a></p>
            </div>
        </div>
    );
};

export default Modal;

