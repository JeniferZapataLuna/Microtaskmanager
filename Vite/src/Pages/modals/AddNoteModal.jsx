// src/AddNoteModal.jsx
import React, { useState } from 'react';
import '../css/Modal.css';

const AddNoteModal = ({ createNota, closeModal }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    color: '#B5D8B3',
    contenido: '',
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
    await createNota(formData);
    closeModal();
    location.reload()
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <label className='til2'>Añadir Nota</label>
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
          <button type='submit' className='form Registrar hover-effect'>Añadir Nota</button>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
