// src/routes/evaluerRoutes.js

import express from 'express';
const router = express.Router();
import evaluerController from '../controllers/evaluador/evaluerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Definir la ruta para la página de evaluador
router.get('/home', authMiddleware, evaluerController.getHomeEvaluer); 
router.get('/perfil', authMiddleware, evaluerController.getPerfilEvaluer);

export default router; 