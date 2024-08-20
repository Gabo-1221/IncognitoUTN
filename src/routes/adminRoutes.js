// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const formsController = require('../controllers/forms/formsController');

// Definir la ruta para la página de administración
router.get('/home', adminController.getHomeAdmin);
router.get('/listaUsuario',adminController.getUsers);
router.get('/listaEncuesta',adminController.getQuestions);

router.get('/listaEncuesta/:categoriaId', adminController.getQuestionsByCategory);
router.get('/ultimoRegistro', adminController.getlastEnc);

router.get('/listaPreguntas',adminController.getAsks);
router.get('/listaCategorias',adminController.getService);
router.get('/listaAreas',adminController.getArea);
router.get('/formEncuesta',adminController.getFormQuestion);
router.get('/formEncuestaP2',adminController.getFormQuestionP2);
router.get('/formPregunta',adminController.getFormAsk);
router.get('/formCategoria',adminController.getCategoria);
router.get('/perfil', adminController.getPerfil)
router.get('/listaPreguntas/:idPregunta', formsController.findOnePregunta);


module.exports = router;
