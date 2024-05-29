import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, TextField, Typography, Box } from '@mui/material';

const ModalC = ({ closeModal }) => {
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
        } else {
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
        <Modal open onClose={closeModal} disableEscapeKeyDown
           sx={{display: 'flex',justifyContent: 'center'}} >
            <Box sx={{
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'column',
                top: 0,
                right: 0,
                width: "35%",
                height: "90%",
                margin: "30px",
                background: '#FFFFFF',
                borderRadius: 3,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
            }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom >Crea un Usuario</Typography>
                    <TextField
                        type="text"
                        name="nombre"
                        id="nombre"
                        label="Nombre"
                        variant="outlined"
                        className='form Nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="email"
                        name="email"
                        id="email"
                        label="Email"
                        variant="outlined"
                        className='form Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="cedula"
                        id="cedula"
                        label="Cédula"
                        variant="outlined"
                        className='form Cedula'
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="password"
                        name="contrasena"
                        id="contrasena"
                        label="Contraseña"
                        variant="outlined"
                        className='form Contraseña'
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="password"
                        name="Ccontrasena"
                        id="Ccontrasena"
                        label="Verificar Contraseña"
                        variant="outlined"
                        className='form Contraseña'
                        value={formData.Ccontrasena}
                        onChange={handleChange}
                        required
                    />
                    <Button type='submit'variant="contained" 
                    sx={{
                        margin:"10px 0px 10px 0px",
                        width: "88%",
                        bgcolor: "#9ED3DC",
                        borderRadius: "20px"
                    }}>Registrarse</Button>
                </form>
                <Typography variant="body1" gutterBottom>Volver a la página principal <a href='/' className='open-modal-link' onClick={closeModal}>Inicio</a></Typography>
            </Box>
        </Modal>
    );
};

export default ModalC;
