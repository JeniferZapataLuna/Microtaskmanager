import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';
import Modal from './Modal.jsx';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Link,
  Alert
} from '@mui/material';

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
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

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
        <Dialog open={true} onClose={closePopup}
        sx={{
          padding: 3,
          borderRadius: 3,
          textAlign: 'center',
          width: '90%', // Ajusta el ancho aquí (ejemplo: 90%)
          maxWidth: '550px', // Máximo ancho en pixeles
          margin: 'auto',
          
        }}>
            <DialogTitle 
            sx={{          
            justifyItems: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            width: '180px',
            height: '55px',
            margin: 'auto',
            margintop: "10px"
          }}>
              Iniciar Sesión
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleLogin}>
                    <TextField
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        label="Usuario"
                        sx={{width: "90%"}}

                    />
                    <TextField
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        label="Contraseña"
                        sx={{width: "90%"}}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, width: "90%",borderRadius: '20px', backgroundColor: '#9ED3DC' }}
                    >
                        Ingresar
                    </Button>
                </form>
                {mensaje && <Alert severity="info" sx={{ mt: 2 }}>{mensaje}</Alert>}
                <Box mt={2} textAlign="center">
                    <Typography>¿Necesitas una cuenta? <Link href="#" onClick={openModal}>Registrarse</Link></Typography>
                    {isModalOpen && <Modal closeModal={closeModal} />}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Inicio_Sesion;

 
 
