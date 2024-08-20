// src/controllers/admin/adminController.js
const Pregunta = require('../../models/Pregunta');
const Categoria = require('../../models/Categoria');
const Area = require('../../models/Area');
const Usuario = require('../../models/Usuario');
const Encuesta = require('../../models/Encuesta');
const express = require('express');
const userHelper = require('../../helpers/userHelper'); // Importa la función auxiliar
// Controlador para renderizar la vista homeAdmin
exports.getHomeAdmin = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('admin/homeAdmin', { title: 'Incognito UTN | Administrador', username: userData.username, rol: userData.rol, activeSection: 'dashboard' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userId = req.session.userId;
    const usuarios = await Usuario.find()
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('admin/listaUsuario', { title: 'Incognito UTN | Usuarios', username: userData.username, rol: userData.rol, usuarios: usuarios, activeSection: 'usuarios' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  /* try{
    const encuestas =  await Encuesta.find()
    const categorias = await Categoria.find()
    const areas = await Area.find()
    res.render('admin/listaEncuesta',{title: 'Lista Encuesta', encuestas:encuestas, categorias: categorias, areas:areas})
  }catch(error){
    console.log(error)
  } */
  try {
    const userId = req.session.userId;
    const encuestas = await Encuesta.find()
    const categorias = await Categoria.find()
    const areas = await Area.find()
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('admin/listaEncuesta', { title: 'Incognito UTN | Lista Encuesta', username: userData.username, rol: userData.rol, categorias: categorias, areas: areas, activeSection: 'encuestas' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getAsks = async (req, res) => {
  /* try {
    const preguntas = await Pregunta.find()
    res.render('admin/listaPreguntas',{title: 'Lista Preguntas', preguntas:preguntas})
  } catch (error) {
    console.log(error)
  } */

  try {
    const userId = req.session.userId;
    const preguntas = await Pregunta.find()
    const areas = await Area.find()
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('admin/listaPreguntas', { title: 'Incognito UTN | Lista Preguntas', username: userData.username, rol: userData.rol, preguntas: preguntas, activeSection: 'preguntas' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getQuestionsByCategory = async (req, res) => {
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

exports.getlastEnc = async (req, res) => {
  try {
    const lastRecord = await Encuesta.findOne().sort({ _id: -1 }).exec();
    res.json(lastRecord);
    // Asegúrate de que preguntas no contiene referencias circulares
  } catch (error) {
    console.log(error);
  }
}

exports.getService = async (req, res) => {
  /* try {
    const categorias = await Categoria.find()
    res.render('admin/listaCategorias',{title: 'Lista Categoria', categorias:categorias })
  } catch (error) {
    console.log(error)
  } */
  try {
    const categorias = await Categoria.find()
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('admin/listaCategorias', { title: 'Incognito UTN | Lista Categorias', username: userData.username, rol: userData.rol, categorias: categorias, activeSection: 'categorias' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getArea = async (req, res) => {
  /* try {
    const areas = await Area.find();
    res.render('admin/listaAreas', { title: 'Lista Areas', areas: areas })
  } catch (error) {
    console.log(error)
  } */

  try {
    const areas = await Area.find();
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
      res.render('admin/listaAreas', { title: 'Incognito UTN | Lista Areas', username: userData.username, rol: userData.rol,areas: areas, activeSection: 'areas' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

exports.getFormQuestion = (req, res) => {
  res.render('forms/formEncuesta', { title: 'Creacion de Encuesta' })
};

exports.getFormQuestionP2 = (req, res) => {
  res.render('forms/formEncuestaP2', { title: 'Creacion de Encuesta' })
};

exports.getFormAsk = (req, res) => {
  res.render('forms/formPregunta', { title: 'Creacion de Pregunta' })
};

exports.getCategoria = (req, res) => {
  res.render('forms/formCategoria', { title: 'Creacion de Categoria' })
};

exports.getPerfil = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('perfil/perfilAdmin', {
        title: 'Incognito UTN | Mi perfil', username: userData.username, rol: userData.rol,
        apellido: userData.apellidos, email: userData.correo, fecha_nac: userData.fecha_nac, message: null, messageEmail: null,
         MessageNewPassword: null, MessageNewPasswordError: null,activeSection: "perfil"
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
  //res.render('perfil/perfilAdmin',{title: 'Mi perfil'})
};