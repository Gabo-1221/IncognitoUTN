//
const express = require('express');
const router = express.Router();
const mysteryController = require('../controllers/mystery/mysteryController'); // Ajusta el nombre si es necesario
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware

router.get('/home', authMiddleware, mysteryController.getHomeMystery); // Aplica el middleware
router.get('/perfil', authMiddleware, mysteryController.getPerfilMystery);

module.exports = router;