const Usuario = require('../models/Usuario'); 
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    // Si no hay userId en la sesión, redirige a /home
    return res.redirect('/'); 
  }

  // Busca al usuario en la base de datos
  const usuario = await Usuario.findById(userId);

  if (!usuario) {
    // Si no se encuentra el usuario, redirige a /home
    return res.redirect('/'); 
  }

  // Si el usuario está autenticado, pasa a la siguiente ruta
  next();
};

module.exports = authMiddleware;