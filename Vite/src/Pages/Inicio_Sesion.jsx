import React, { useState } from 'react';
import './Inicio_Sesion.css';
import Modal from './Modal.jsx';

const Inicio_Sesion = ({ closePopup }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (event) => {
        event.preventDefault(); // Previene la navegación del enlace
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='modal_container' id='modal_container'>
            <div className='modal'>
                <label type="text" className='til'>Iniciar Sesión</label>
               <form className='Form'>
                    <span className="close-button" onClick={closePopup}>&times;</span>
                    <input type="text" name='Usuario' className='form Usuario' id='FormU_Usuario' placeholder="Usuario"/>
                    <input type="text" name='Contraseña' className='form Contraseña'  id='FormU_Contraseña' placeholder="Contraseña"/>
                    <button type='button' className='form Ingresar hover-effect'>Ingresar</button>
                </form>
                <div className="main-container">
                <p>¿Necesitas una cuenta? <a href="#" onClick={toggleModal} className="open-modal-link">Regristrarse</a>
                  {isModalOpen && <Modal closeModal={toggleModal} />}</p>
                </div>
            </div>
            </div>
    );
};

export default Inicio_Sesion;

 
 
 
