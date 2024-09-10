// src/controllers/admin/adminController.js
import Pregunta from '../../models/Pregunta.js';
import Categoria from '../../models/Categoria.js';
import Area from '../../models/Area.js';
import Usuario from '../../models/Usuario.js';
import Encuesta from '../../models/Encuesta.js';
import express from 'express';
import userHelper from '../../helpers/userHelper.js';
// Controlador para renderizar la vista homeAdmin
export const getHomeAdmin = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('admin/homeAdmin', { title: 'Incognito UTN | Administrador', username: userData.username, rol: userData.rol, activeSection: 'dashboard', imagen: userData.imagen });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.session.userId;

    const usuarios = await Usuario.find()
      .populate('rol', 'nombre')
      .lean();

    usuarios.forEach(usuario => {
      usuario.encuestasCreadasCount = usuario.encuestas_creadas.length;
      usuario.encuestasResueltasCount = usuario.encuestas_resueltas.length;
    });

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }

    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('admin/listaUsuario', {
          title: 'Incognito UTN | Usuarios',
          username: userData.username,
          rol: userData.rol,
          usuarios: usuarios, // Pasar los usuarios con la información del rol y el conteo de encuestas
          activeSection: 'usuarios',
          imagen: userData.imagen
        });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const userId = req.session.userId;
    const encuestas = await Encuesta.find()
      .populate('id_area', 'nombre color_hover')
      .populate('id_encargado', 'nombre')
      .sort({ _id: -1 }); // Popular el nombre de usuario

    const categorias = await Categoria.find();
    const areas = await Area.find();

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }

    const userData = await userHelper.getUserData(userId);

    if (userData) {
      if (userData.rol == 'Administrador') {
        const encuestasFormateadas = encuestas.map(encuesta => {
          return {
            ...encuesta._doc, // Copiar las propiedades del objeto original
            fecha_creada: formatearFecha(encuesta.fecha_creada),
            fecha_limite: formatearFecha(encuesta.fecha_limite)
          };
        });
        res.render('admin/listaEncuesta', { 
          title: 'Incognito UTN | Lista Encuesta', 
          username: userData.username, 
          rol: userData.rol, 
          categorias: categorias, 
          areas: areas, 
          activeSection: 'encuestas', 
          //encuestas: encuestas, 
          encuestas: encuestasFormateadas,
          imagen: userData.imagen 
        });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

// Función para formatear la fecha
function formatearFecha(fecha) {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones); // Cambiar 'es-ES' por el idioma deseado
}

export const getAsks = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Usar populate para obtener el nombre de la categoría y el usuario en una sola consulta
    const preguntas = await Pregunta.find()
      .populate('id_categoria', 'nombre')
      .populate('id_creo', 'nombre')
      .sort({ _id: -1 }); // Ordenar por _id en orden descendente

    const categorias = await Categoria.find(); // Mantener la consulta para el modal

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }

    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('admin/listaPreguntas', {
          title: 'Incognito UTN | Lista Preguntas',
          username: userData.username,
          rol: userData.rol,
          preguntas: preguntas, // Pasar las preguntas con la información de la categoría y el usuario
          activeSection: 'preguntas',
          categorias: categorias, // Pasar las categorías para el modal
          imagen: userData.imagen
        });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getQuestionsByCategory = async (req, res) => {
  try {
    const { categoriaId } = req.params;

    // Filtrar preguntas por la categoría seleccionada
    const preguntas = await Pregunta.find({ id_categoria: categoriaId });

    // Verifica que preguntas sea un array simple de objetos sin referencias circulares
    res.json(preguntas); // Asegúrate de que preguntas no contiene referencias circulares
  } catch (error) {
    console.log("Error al obtener preguntas por categoría");
    console.log(error);
    res.status(500).send('Error al obtener preguntas');
  }
}

export const getlastEnc = async (req, res) => {
  try {
    const lastRecord = await Encuesta.findOne().sort({ _id: -1 }).exec();
    res.json(lastRecord);
    // Asegúrate de que preguntas no contiene referencias circulares
  } catch (error) {
    console.log(error);
  }
}

export const getService = async (req, res) => {
  try {
    const categorias = await Categoria.find().populate('id_creo', 'nombre').sort({ _id: -1 }); // Usar populate para obtener el nombre del usuario

    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('admin/listaCategorias', {
          title: 'Incognito UTN | Lista Categorias',
          username: userData.username,
          rol: userData.rol,
          categorias: categorias, // Pasar las categorías con la información del usuario
          activeSection: 'categorias',
          imagen: userData.imagen
        });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getArea = async (req, res) => {
  try {
    const areas = await Area.find().populate('id_creo', 'nombre').sort({ _id: -1 });
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('admin/listaAreas', { title: 'Incognito UTN | Lista Areas', username: userData.username, rol: userData.rol, areas: areas, activeSection: 'areas', imagen: userData.imagen });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getFormQuestion = (req, res) => {
  res.render('forms/formEncuesta', { title: 'Creacion de Encuesta' })
};

export const getFormQuestionP2 = (req, res) => {
  res.render('forms/formEncuestaP2', { title: 'Creacion de Encuesta' })
};

export const getFormAsk = (req, res) => {
  res.render('forms/formPregunta', { title: 'Creacion de Pregunta' })
};

export const getCategoria = (req, res) => {
  res.render('forms/formCategoria', { title: 'Creacion de Categoria' })
};

export const getPerfil = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      if (userData.rol == 'Administrador') {
        res.render('perfil/perfilAdmin', {
          title: 'Incognito UTN | Mi perfil', username: userData.username, rol: userData.rol,
          apellido: userData.apellidos, email: userData.correo, fecha_nac: userData.fecha_nac, message: null, messageEmail: null,
          MessageNewPassword: null, MessageNewPasswordError: null, activeSection: "perfil", imagen: userData.imagen
        });
      } else {
        res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
  //res.render('perfil/perfilAdmin',{title: 'Mi perfil'})
};

const adminController = {
  getHomeAdmin,
  getUsers,
  getQuestions,
  getAsks,
  getQuestionsByCategory,
  getlastEnc,
  getService,
  getArea,
  getFormQuestion,
  getFormQuestionP2,
  getFormAsk,
  getCategoria,
  getPerfil
};

// Exporta el objeto como valor por defecto
export default adminController;