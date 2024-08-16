// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');

// Ruta para mostrar el formulario de login
router.get('/login', authController.formLogin);

// Ruta para manejar el envío del formulario de login
router.post('/login', authController.login);

// Ruta para mostrar el formulario de registro
router.get('/register', authController.formRegistrar);
// Ruta para manejar el registro de usuarios
router.post('/register', authController.Register);

// Define la ruta selectRol
router.get('/selectRol', (req, res) => {
    const userId = req.session.userId; // Accede al userId desde la sesión
    res.render('auth/selectRol', { userId: userId }); // Pasa el userId a la vista
    //console.log(userId);
  });

router.post('/rol_evaluador', authController.selectRolEvaluador);

router.post('/rol_mystery', authController.selectRolMystery);

router.post('/updateUserData', authController.updateUserData);

router.get('/logout', authController.logout);

module.exports = router;
