import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Pagina2.css';
import { useAuth } from './utils/AuthContext';
import AddNoteModal from './modals/AddNoteModal';
import EditNoteModal from './modals/EditNoteModal';

const Pagina2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, cedula } = useAuth();
  const [notas, setNotas] = useState([]);
  const [newNotaModalOpen, setNewNotaModalOpen] = useState(false);
  const [editNota, setEditNota] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const hover = (element) => {
    element.addEventListener("mouseover", () => {
      element.style.backgroundColor = "lightblue";
    });

    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";
    });
  };

  const addhover = () => {
    const botones = document.getElementsByClassName("hover");
    Array.from(botones).map(boton => {
      hover(boton);
    });
  };

  const close_ham = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (cedula) {
      // Fetch notas del usuario usando la cedula
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNota(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      try {
        const response = await axios.get(`/api/usuarios/${cedula}/carpetas/root/notas/buscar`, {
          params: { query }
        });
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
      <section className={`hamburguesa-bg ${menuOpen ? 'active' : 'unactive'}`} onClick={close_ham}></section>
      <div className='Principal' onLoad={addhover}>
        <div className='D1'>
          <section className="menu_ham menu">
            <img src='./Img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/>
          </section>
          <img src='./Img/papel.png' alt="icon" className='Icono'/>
          <p className='name'>MICROTASKMANAGER</p>
          <img src="./Img/Perfil.png" alt="Cerrar sesion" className='Perfil' onClick={logout} />
        </div>
        <section className='body-mid'>
          <form onSubmit={handleSearch}>
            <input type="search" className='buscar' name="search" id="search-note" placeholder="Buscar notas..." />
            <button type="submit" className='buscar hover-effect'>🔎</button>
          </form>
          <button type="button" className='agregar hover-effect' onClick={openNewNotaModal}>+</button>
        </section>
        
        <div className="container">
          {notas.map((nota) => (
            <section key={nota._id} className='notas' style={{ backgroundColor: nota.color }}>
              <div className='Fecha'>
                {new Date(nota.fecha).toLocaleString()}
                <button className='edit-button' onClick={() => openEditModal(nota)}>E</button>
                <button className='close-button' onClick={() => deleteNota(nota._id)}>X</button>
              </div>
              <div className="text-bold">{nota.titulo}</div>
              <div className='note-content'>{nota.contenido}</div>
              
            </section>
          ))}
        </div>
        <ul className={`hamburguesa-contents ${menuOpen ? 'active' : 'unactive'}`}>
          <li><img src='./Img/menu.png' alt="Menu hamburguesa" onClick={toggleMenu} className='img hover hamburguesa-toggle'/></li>
          <li><a href="#" className='hover'>Inicio</a></li>
          <li><a href="#" className='hover'>Sobre nosotros</a></li>
          <li><a href="#" className='hover'>Servicios</a></li>
          <li><a href="#" className='hover'>Contacto</a></li>
        </ul>
      </div>
    </>
  );
};

export default Pagina2;
