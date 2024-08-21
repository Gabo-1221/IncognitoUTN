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

//outer.get('/formEncuestaP2/:categoriaId', formsController.getAsksByCategoria);

export default router; // Exportar el router usando ES Modules