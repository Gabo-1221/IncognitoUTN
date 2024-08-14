// src/routes/formsRoutes.js

const express = require('express');
const router = express.Router();
const formsController = require('../controllers/forms/formsController');

// Definir la ruta para la página de evaluador
router.post('/nuevaPregunta', formsController.newQuestion);
router.post('/nuevaCategoria', formsController.newCategoria);
router.post('/nuevArea', formsController.newArea);

module.exports = router;