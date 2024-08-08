// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');

// Definir la ruta para la página de administración
router.get('/home', adminController.getHomeAdmin);

module.exports = router;
