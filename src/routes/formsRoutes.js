// src/routes/formsRoutes.js

const express = require('express');
const router = express.Router();
const formsController = require('../controllers/forms/formsController');

// Definir la ruta para la página de evaluador
router.post('/nuevaPregunta', formsController.newQuestion);
router.post('/nuevaCategoria', formsController.newCategoria);
router.post('/nuevArea', formsController.newArea);
router.post('/nuevaEncuesta', formsController.newEncuesta);
router.post('/nuevaEncPreg', formsController.newEncPreg);
router.get('/eliminarPregunta/:idpregunta', formsController.deletePregunta);
router.get('/eliminarCategoria/:idcategoria', formsController.deleteCategoria);
router.get('/eliminarArea/:idArea', formsController.deleteArea);
router.get('/eliminarEncuesta/:idEncuesta', formsController.deleteEncuesta);

//outer.get('/formEncuestaP2/:categoriaId', formsController.getAsksByCategoria);

module.exports = router;