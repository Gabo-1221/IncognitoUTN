// middleware/authMiddleware.js
import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/');
  }

  const usuario = await Usuario.findById(userId);

  if (!usuario) {
    return res.redirect('/');
  }

  next();
};

export default authMiddleware;