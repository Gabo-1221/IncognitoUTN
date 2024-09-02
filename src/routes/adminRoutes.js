// src/routes/adminRoutes.js

import express from 'express';
const router = express.Router();
import adminController from '../controllers/admin/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import formsController from '../controllers/forms/formsController.js';
//import formsController from '../controllers/forms/formsController';

// Definir la ruta para la página de administración
router.get('/home', authMiddleware, adminController.getHomeAdmin);
router.get('/listaUsuario', authMiddleware, adminController.getUsers);
router.get('/listaEncuesta', authMiddleware, adminController.getQuestions);

router.get('/listaEncuestaCategoria/:categoriaId', adminController.getQuestionsByCategory);
router.get('/ultimoRegistro', authMiddleware, adminController.getlastEnc);

router.get('/listaPreguntas', authMiddleware, adminController.getAsks);
router.get('/listaCategorias', authMiddleware, adminController.getService);
router.get('/listaAreas', authMiddleware, adminController.getArea);
router.get('/formEncuesta', adminController.getFormQuestion);
router.get('/formEncuestaP2', adminController.getFormQuestionP2);
router.get('/formPregunta', adminController.getFormAsk);
router.get('/formCategoria', adminController.getCategoria);
router.get('/listaPreguntas/:idPregunta', formsController.findOnePregunta);
router.get('/listaCategorias/:idCategoria', formsController.findOneCategoria);
router.get('/listaAreas/:idArea', formsController.findOneArea);
router.get('/formEditarEncu/:idEncuesta', formsController.obtenerDatosEncuesta);
router.get('/preguntasSelects/:idEncuesta', formsController.preguntasSelects);
router.get('/preguntasCategoria/:idEncuesta', formsController.preguntasCategoria);
router.get('/perfil', authMiddleware, adminController.getPerfil);


export default router;