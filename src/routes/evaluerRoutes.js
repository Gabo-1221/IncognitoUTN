// src/routes/evaluerRoutes.js

const express = require('express');
const router = express.Router();
const evaluerController = require('../controllers/evaluador/evaluerController'); // Ajusta el nombre si es necesario
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware

// Definir la ruta para la página de evaluador
router.get('/home', authMiddleware, evaluerController.getHomeEvaluer); // Aplica el middleware
router.get('/perfil', authMiddleware, evaluerController.getPerfilEvaluer);

module.exports = router;