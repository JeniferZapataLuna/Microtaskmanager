import mongoose from 'mongoose';
import express from 'express';
import { MONGO_URL, PUERTO } from './config.js';
import { Usuario } from './modelos/usuarioModelo.js';

const app = express();
app.use(express.json());


// Obtener datos
app.get('/api/usuarios', async (solicitud, respuesta) => {
  try {
    const users = await Usuario.find();
    return respuesta.status(200).send(users);
  } catch (error) {
    console.log(error);
    return respuesta.status(500).send({ message: error.message });
  }
});


// Registar Usuarios
app.post('/api/registrar', async (solicitud, respuesta) => {
  try {
    let { nombre, email, cedula, contrasena } = solicitud.body;
    if (!nombre || !email || !cedula || !contrasena) {
      return respuesta.status(400).send('Ingresar todos los datos');
    }

    const existeUsuario = await Usuario.findOne({ $or: [{ email }, { cedula }] });
    if (existeUsuario) {
      return respuesta.status(200).send({ mensaje: 'El Usuario ya existe' });
    } else {
      const user = await Usuario.create({ nombre, email, cedula, contrasena });
      return respuesta.status(201).send({ user });
    }
  } catch (error) {
    console.log(error);
    return respuesta.status(500).send({ message: error.message });
  }
});

// Actualizar usuario
app.put('/api/actualizar/:id', async (solicitud, respuesta) => {
  try {
    const { id } = solicitud.params;
    const { nombre, email, cedula, contrasena } = solicitud.body;
    if (!nombre || !email || !cedula || !contrasena) {
      return respuesta.status(400).send('Ingresar todos los datos');
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, cedula, contrasena },
      { new: true }
    );

    if (!usuarioActualizado) {
      return respuesta.status(404).send({ mensaje: 'Usuario no encontrado' });
    }

    return respuesta.status(200).send({ usuario: usuarioActualizado });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).send({ message: error.message });
  }
});

// Eliminar usuario
app.delete('/api/eliminar/:id', async (solicitud, respuesta) => {
  try {
    const { id } = solicitud.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return respuesta.status(404).send({ mensaje: 'Usuario no encontrado' });
    }

    return respuesta.status(200).send({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).send({ message: error.message });
  }
});

// Iniciar sesión
app.post('/api/login', async (solicitud, respuesta) => {
  try {
    const { email, contrasena } = solicitud.body;

    if (!email || !contrasena) {
      return respuesta.status(400).send('Ingresar todos los datos');
    }

    const user = await Usuario.findOne({ email });

    if (!user) {
      return respuesta.status(400).send({ mensaje: 'Usuario no encontrado' });
    }

    const isMatch = await user.matchPassword(contrasena);

    if (!isMatch) {
      return respuesta.status(400).send({ mensaje: 'Contraseña incorrecta' });
    }

    return respuesta.status(200).send({"success": true, mensaje: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).send({ message: error.message });
  }
});






// Conectar a la base de datos y arrancar el servidor
mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PUERTO, () => {
      console.log(`App arriba en el puerto ${PUERTO}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
