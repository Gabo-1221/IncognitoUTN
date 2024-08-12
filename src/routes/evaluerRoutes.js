// src/routes/valuerRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/evaluador/evaluerController');

// Definir la ruta para la página de evaluador
router.get('/home', adminController.getHomeEvaluer);

module.exports = router;
