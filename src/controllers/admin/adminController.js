// src/controllers/admin/adminController.js
const Pregunta = require('../../models/Pregunta');
const Categoria = require('../../models/Categoria');
const Area = require('../../models/Area');
const Usuario = require('../../models/Usuario');
const Encuesta = require('../../models/Encuesta');
const express = require('express');
// Controlador para renderizar la vista homeAdmin
exports.getHomeAdmin = (req, res) => {
  const userId = res.locals.userId; // Obtiene el userId de res.locals
  res.render('admin/homeAdmin', { 
    title: 'Página de Administración', 
    userId: userId  // Pasa el userId a la vista
  });
};
  
exports.getUsers = async (req , res ) => {
  try {
    const usuarios = await Usuario.find()
    res.render('admin/listaUsuario',{title: 'Lista Usuario',usuarios:usuarios})
  } catch (error) {
    console.log(error)
  }
};

exports.getQuestions = async (req , res ) => {
  try{
    const encuestas =  await Encuesta.find()
    const categorias = await Categoria.find()
    const areas = await Area.find()
    res.render('admin/listaEncuesta',{title: 'Lista Encuesta', encuestas:encuestas, categorias: categorias, areas:areas})
  }catch(error){
    console.log(error)
  }
};

exports.getAsks = async (req , res ) => {
try {
  const preguntas = await Pregunta.find()
  res.render('admin/listaPreguntas',{title: 'Lista Preguntas', preguntas:preguntas})
} catch (error) {
  console.log(error)
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

    res.json(lastRecord); // Asegúrate de que preguntas no contiene referencias circulares
} catch (error) {
    console.log(error);
}
}

exports.getService = async (req , res ) => {
try {
  const categorias = await Categoria.find()
  res.render('admin/listaCategorias',{title: 'Lista Categoria', categorias:categorias })
} catch (error) {
  console.log(error)
}
};

exports.getArea = async (req , res ) => {
try {
  const areas = await Area.find();
  res.render('admin/listaAreas',{title: 'Lista Areas', areas: areas})
} catch (error) {
  console.log(error)
}
};

exports.getFormQuestion = (req , res ) => {
  res.render('forms/formEncuesta',{title: 'Creacion de Encuesta'})
};

exports.getFormQuestionP2 = (req , res ) => {
  res.render('forms/formEncuestaP2',{title: 'Creacion de Encuesta'})
};

exports.getFormAsk = (req , res ) => {
  res.render('forms/formPregunta',{title: 'Creacion de Pregunta'})
};

exports.getCategoria = (req , res ) => {
  res.render('forms/formCategoria',{title: 'Creacion de Categoria'})
};

exports.getPerfil = (req , res ) => {
  res.render('perfil/perfil',{title: 'Mi perfil'})
};