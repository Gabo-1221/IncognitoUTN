// src/routes/formsRoutes.js

import express from 'express';
const router = express.Router();
import formsController from '../controllers/forms/formsController.js'; // Importar con ES Modules

// Definir la ruta para la página de evaluador
router.post('/nuevaPregunta', formsController.newQuestion);
router.post('/nuevaCategoria', formsController.newCategoria);
router.post('/nuevArea', formsController.newArea);
router.post('/nuevaEncuesta', formsController.newEncuesta);
router.post('/nuevaEncPreg', formsController.newEncPreg);
router.post('/EditarEncuesta', formsController.updateEncuesta);
router.get('/eliminarPregunta/:idpregunta', formsController.deletePregunta);
router.get('/eliminarCategoria/:idcategoria', formsController.deleteCategoria);
router.get('/eliminarArea/:idArea', formsController.deleteArea);
router.get('/eliminarEncuesta/:idEncuesta', formsController.deleteEncuesta);
router.post('/editarPregunta', formsController.updateAsk);
router.post('/editarCategoria', formsController.updateCategoria);
router.post('/editarArea', formsController.updateArea);

//outer.get('/formEncuestaP2/:categoriaId', formsController.getAsksByCategoria);

export default router; // Exportar el router usando ES Modules