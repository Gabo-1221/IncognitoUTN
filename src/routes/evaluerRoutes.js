// src/routes/evaluerRoutes.js

import express from 'express';
const router = express.Router();
import evaluerController from '../controllers/evaluador/evaluerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import formsController from '../controllers/forms/formsController.js';

// Definir la ruta para la página de evaluador
router.get('/home', authMiddleware, evaluerController.getHomeEvaluer); 
router.get('/perfil', authMiddleware, evaluerController.getPerfilEvaluer);
router.get('/listaMiEncuesta',authMiddleware, evaluerController.getMyQuestions);
router.get('/listaMisAreas',authMiddleware, evaluerController.getMyAreas);
router.get('/listaMisCategorias',authMiddleware, evaluerController.getMyCategoria);
router.get('/listaMisPreguntas',authMiddleware, evaluerController.getMyAsks);
router.get('/formEditarEncuesta/:idEncueta',authMiddleware, formsController.obtenerDatosEncuesta);




export default router; 