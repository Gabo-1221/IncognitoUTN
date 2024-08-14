const express = require('express');
const router = express.Router();
// Importa el módulo jsonwebtoken
const jwt = require('jsonwebtoken');
// Importa el modelo Usuario
const Usuario = require('../models/Usuario');

/* router.get('/', (req, res) => {
  res.render('home/home', { title: 'Incognito UTN' });
}); */

// Ruta raíz
router.get('/', async (req, res) => {
  // Verifica si el usuario tiene una cookie "rememberMeToken"
  const token = req.cookies.rememberMeToken;

  if (token) {
    try {
      // Verifica el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guarda el ID del usuario en la sesión
      req.session.userId = decoded.userId;

      // Redirige al usuario a su vista predeterminada según su rol
      const usuario = await Usuario.findById(decoded.userId); // Ahora puedes usar await aquí
      if (usuario) {
        if (usuario.rol === 3) {
          res.redirect('/admin/home');
        } else if (usuario.rol === 2) {
          res.redirect('/evaluador/home');
        } else if (usuario.rol === 1) {
          res.redirect('/mystery/home');
        } else {
          // Maneja el caso de un rol inválido
          res.redirect('/auth/login'); // O a donde quieras redirigir en caso de error
        }
      } else {
        // Usuario no encontrado
        res.redirect('/auth/login'); // O a donde quieras redirigir en caso de error
      }
    } catch (error) {
      // El token es inválido o ha expirado
      console.error('Error al verificar el token:', error);
      res.render('home/home',{ title: 'Incognito UTN' }); // Renderiza la landing page si hay un error
    }
  } else {
    // El usuario no tiene una cookie "rememberMeToken"
    res.render('home/home',{ title: 'Incognito UTN' }); // Renderiza la landing page
  }
});

router.get('/sobreNosotros', (req, res) => {
    res.render('home/sobreNosotros', { title: 'Incognito UTN | Sobre nosotros' });
  });

module.exports = router;
