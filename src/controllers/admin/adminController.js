// src/controllers/admin/adminController.js

// Controlador para renderizar la vista homeAdmin
exports.getHomeAdmin = (req, res) => {
    res.render('admin/homeAdmin', { title: 'Página de Administración' });
  };
  
exports.getUsers = (req , res ) => {
    res.render('admin/listaUsuario',{title: 'Lista Usuario'})
};

exports.getQuestions = (req , res ) => {
  res.render('admin/listaEncuesta',{title: 'Lista Encuesta'})
};

exports.getAsks = (req , res ) => {
  res.render('admin/listaPreguntas',{title: 'Lista Preguntas'})
};

exports.getService = (req , res ) => {
  res.render('admin/listaCategorias',{title: 'Lista Servicios'})
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