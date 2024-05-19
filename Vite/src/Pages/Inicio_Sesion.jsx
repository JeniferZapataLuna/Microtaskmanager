
import React from 'react';
import './Inicio_Sesion.css';

const Inicio_Sesion = ({ closePopup }) => {
    return (
        <div className='modal_container' id='modal_container'>
            <div className='modal'>
                <label type="text" className='til'>Iniciar Sesión</label>
               <div className='Form'>
                    <input type="text" className='form Usuario'  placeholder="Usuario"/>
                    <input type="text" className='form Contraseña'  placeholder="Contraseña"/>
                    <button type='button' className='form Ingresar hover-effect'>Ingresar</button>
                </div>
                <p>¿Necesitas una cuenta? <a href="http://localhost:5173/" className='Registrarse hover-effect'>Registrarse</a></p>
                <button type="button" onClick={closePopup} className='Cerrar-Modal boton hover-effect'>Cerrar</button>
            </div>
            </div>
    );
};

export default Inicio_Sesion;

 
 
 
