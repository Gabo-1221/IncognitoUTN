// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');

// Definir la ruta para la página de administración
router.get('/home', adminController.getHomeAdmin);
router.get('/listaUsuario',adminController.getUsers);
router.get('/listaEncuesta',adminController.getQuestions);
router.get('/listaPreguntas',adminController.getAsks);
router.get('/listaCategorias',adminController.getService);
router.get('/formEncuesta',adminController.getFormQuestion);

module.exports = router;
