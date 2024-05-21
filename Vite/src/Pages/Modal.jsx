import React from 'react';
import './Modal.css';

const Modal = ({ closeModal }) => {
    return (
        <div className="modal-overlay">
            <label type="text" className='til2'>Crea un Usuario</label>
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <input type="text" className='form Nombre'  placeholder="Nombre"/>
                <input type="text" className='form Email'  placeholder="Email"/>
                <input type="text" className='form Cedula'  placeholder="Cédula"/>
                <input type="text" className='form Contraseña'  placeholder="Contraseña"/>
                <input type="text" className='form Contraseña'  placeholder="Verificar Contraseña"/>
                <button type='button' className='form Registrar hover-effect' ><a  className='Link' href='http://localhost:5173/Pagina2'>Registrarse</a></button>
                <p>Volver a la pagina principal <a href='http://localhost:5173' className='open-modal-link'>Inicio</a></p>
            </div>
        </div>
    );
};

export default Modal;
