// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');

// Ruta para mostrar el formulario de login
router.get('/login', authController.formLogin);

// Ruta para manejar el envío del formulario de login
router.post('/login', authController.login);

// Ruta para manejar el registro de usuarios
router.post('/register', authController.register);

// Ruta para mostrar el formulario de registro
router.get('/register', authController.formRegistrar);

module.exports = router;
