// src/routes/mysteryRoutes.js
import express from 'express';
const router = express.Router();
import mysteryController from '../controllers/mystery/mysteryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/home', authMiddleware, mysteryController.getHomeMystery);
router.get('/perfil', authMiddleware, mysteryController.getPerfilMystery);
router.get('/listaEncuestasPendientes', authMiddleware, mysteryController.getListaEncuestasPendientes);
router.get('/listaEncuestasRealizadas', authMiddleware, mysteryController.getListaEncuestasRealizadas);
router.get('/responderEncuesta/:id', authMiddleware, mysteryController.responderEncuesta);

export default router;