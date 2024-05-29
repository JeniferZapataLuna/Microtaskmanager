import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, TextField, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Paper } from '@mui/material';
import { useAuth } from './utils/AuthContext';
import AddNoteModal from './modals/AddNoteModal';
import EditNoteModal from './modals/EditNoteModal';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Pagina2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, cedula } = useAuth();
  const [notas, setNotas] = useState([]);
  const [newNotaModalOpen, setNewNotaModalOpen] = useState(false);
  const [editNota, setEditNota] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (cedula) {
      const fetchNotas = async () => {
        try {
          const response = await axios.get(`/api/usuarios/${cedula}/carpetas/root/notas`);
          setNotas(response.data);
        } catch (error) {
          console.error('Error al obtener las notas:', error);
        }
      };

      fetchNotas();
    }
  }, [cedula]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      try {
        const response = await axios.get(`/api/usuarios/${cedula}/carpetas/root/notas/buscar`, { params: { query } });
        setNotas(response.data);
      } catch (error) {
        console.error('Error al buscar las notas:', error);
      }
    } else {
      const fetchNotas = async () => {
        try {
          const response = await axios.get(`/api/usuarios/${cedula}/carpetas/root/notas`);
          setNotas(response.data);
        } catch (error) {
          console.error('Error al obtener las notas:', error);
        }
      };

      fetchNotas();
    }
  };

  const createNota = async (nota) => {
    if (cedula && nota.titulo && nota.contenido) {
      try {
        const response = await axios.post(`/api/usuarios/${cedula}/carpetas/root/notas`, nota);
        setNotas([...notas, response.data.nota]);
      } catch (error) {
        console.error('Error al crear la nota:', error);
      }
    }
  };

  const updateNota = async (notaId, updatedNota) => {
    try {
      const response = await axios.put(`/api/usuarios/${cedula}/carpetas/root/notas/${notaId}`, updatedNota);
      setNotas(notas.map(nota => (nota._id === notaId ? response.data.nota : nota)));
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  const deleteNota = async (notaId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta nota?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/usuarios/${cedula}/carpetas/root/notas/${notaId}`);
        setNotas(notas.filter(nota => nota._id !== notaId));
      } catch (error) {
        console.error('Error al eliminar la nota:', error);
      }
    }
  };

  const openEditModal = (nota) => {
    setEditNota(nota);
  };

  const closeEditModal = () => {
    setEditNota(null);
  };

  const openNewNotaModal = () => {
    setNewNotaModalOpen(true);
  };

  const closeNewNotaModal = () => {
    setNewNotaModalOpen(false);
  };

  return (
    <>
      {newNotaModalOpen && <AddNoteModal createNota={createNota} closeModal={closeNewNotaModal} />}
      {editNota && <EditNoteModal nota={editNota} updateNota={updateNota} closeModal={closeEditModal} />}
      <CssBaseline />
      <Box
        sx={{
          display: menuOpen ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
        onClick={closeMenu}
      ></Box>
      <Box
        sx={{
          color: "rgb(0, 0, 0)",
          backgroundColor: "#FFFAFA",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0.6em"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "0em",
          }}
        >
          <IconButton
            sx={{ padding: "0.5em", marginRight: "0.3em", marginLeft: "0.3em", borderRadius: "0.8em"}}
            onClick={toggleMenu}
          >
            <MenuIcon sx={{width:"30px", height: "30px"}}/>
          </IconButton>
          <img
            src="./Img/papel.png"
            alt="icon"
            style={{ width: "45px", height: "45px", padding: "0em" }}
          />
          <Typography
            variant="h5"
            sx={{ fontFamily: "Montserrat", fontWeight: "800", fontSize: "1.7em" }}
          >
            MICROTASKMANAGER
          </Typography>
          <IconButton onClick={logout} sx={{marginLeft: "62.6%"}}>
            <AccountCircle fontSize="large" sx={{width:"45px", height: "45px"}} />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
          <List sx={{ margin: "20px" }}>
            <ListItem button onClick={toggleMenu}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sobre nosotros" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Servicios" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, p: 2 }}>
          <form onSubmit={handleSearch}>
            <TextField
              variant="outlined"
              placeholder="Buscar notas..."
              name="search"
              sx={{ mr: 2 }}
            />
            <IconButton type="submit">
              <SearchIcon fontSize="large" />
            </IconButton>
          </form>
          <Button variant="contained" color="success" onClick={openNewNotaModal} sx={{ fontSize: 24 }}>
            +
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#e0e0e0', p: 2, gap: 2, borderRadius: 2, mt: 4 }}>
          {notas.map((nota) => (
            <Paper key={nota._id} sx={{ bgcolor: nota.color, p: 2, borderRadius: 2, flex: '1 1 285px', maxWidth: '30%', minHeight: 100, position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  {new Date(nota.fecha).toLocaleString()}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => openEditModal(nota)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteNota(nota._id)}>
                    <CloseIcon fontSize="small" sx={{ color: 'error.main' }} />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {nota.titulo}
              </Typography>
              <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                {nota.contenido}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Pagina2;
