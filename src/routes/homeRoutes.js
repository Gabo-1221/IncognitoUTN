const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Define la constante para el estado activo
const STATUS_ACTIVO = "66bf97d6d94dc47ae564b7d7";

// Ruta raíz
router.get('/', async (req, res) => {
  const token = req.cookies.rememberMeToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.session.userId = decoded.userId;

      // Busca al usuario para verificar su estado
      const usuario = await Usuario.findById(decoded.userId);

      if (usuario) {
        // Verifica el estado del usuario
        if (usuario.status === STATUS_ACTIVO) {
          // Redirige al usuario a su vista predeterminada según su rol
          if (usuario.rol === "66be37bf44270796dde41a7a") {
            res.redirect('/admin/home');
          } else if (usuario.rol === "66be379a44270796dde41a79") {
            res.redirect('/evaluador/home');
          } else if (usuario.rol === "66be375044270796dde41a76") {
            res.redirect('/mystery/home');
          } else {
            // Maneja el caso de un rol inválido
            res.clearCookie('rememberMeToken'); // Elimina la cookie
            res.redirect('/auth/login');
            console.log('Rol inválido');
          }
        } else {
          // Usuario no activo, elimina la cookie y redirige
          res.clearCookie('rememberMeToken');
          res.redirect('/auth/login');
          console.log('Usuario no activo');
        }
      } else {
        // Usuario no encontrado
        res.clearCookie('rememberMeToken'); // Elimina la cookie
        res.redirect('/auth/login');
      }
    } catch (error) {
      // El token es inválido o ha expirado
      console.error('Error al verificar el token:', error);
      res.render('home/home', { title: 'Incognito UTN' });
    }
  } else {
    // El usuario no tiene una cookie "rememberMeToken"
    res.render('home/home', { title: 'Incognito UTN' });
  }
});

// ... (resto del código)

module.exports = router;