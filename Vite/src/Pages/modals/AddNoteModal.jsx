import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

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
    location.reload();
  };

  return (
    <Dialog open={true} onClose={closeModal} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <DialogTitle sx={{
        textAlign: 'center',

        backgroundColor: '#fff',
        width: '180px',
        height: '55px',
        margin: 'auto',
        margintop: "10px"
      }}>
        Añadir Nota
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px",display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="titulo"
            label="Título"
            fullWidth
            value={formData.titulo}
            onChange={handleChange}
            required
            sx={{ width: "90%", margin: '10px' }}
          />
          <TextField
            type="color"
            name="color"
            label="Color"
            fullWidth
            value={formData.color}
            onChange={handleChange}
            required
            sx={{width: "90%", margin: '10px' }}
          />
          <TextField
            name="contenido"
            label="Contenido"
            multiline
            rows={4}
            fullWidth
            value={formData.contenido}
            onChange={handleChange}
            required
            sx={{width: "90%", margin: '10px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: '94%', borderRadius: '20px', backgroundColor: '#9ED3DC' }}
          >
            Añadir Nota
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
