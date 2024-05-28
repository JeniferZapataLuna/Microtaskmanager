// src/EditNoteModal.jsx
import React, { useState } from 'react';
import './Pages/css/Modal.css';

const EditNoteModal = ({ nota, updateNota, closeModal }) => {
  const [formData, setFormData] = useState({
    titulo: nota.titulo,
    color: nota.color,
    contenido: nota.contenido,
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
    await updateNota(nota._id, formData);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <label className='til2'>Editar Nota</label>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="titulo"
            className='form Nombre'
            placeholder='Título'
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <input
            type="color"
            name="color"
            className='form Color'
            value={formData.color}
            onChange={handleChange}
            required
          />
          <textarea
            name="contenido"
            className='form Contenido'
            placeholder="Contenido"
            value={formData.contenido}
            onChange={handleChange}
            required
          ></textarea>
          <button type='submit' className='form Registrar hover-effect'>Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
