import express from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import EstatusD from '../models/EstadosUser.js'; // Importa el modelo de estados
import Rol from '../models/Rol.js'; // Importa el modelo de roles

const router = express.Router();

// Ruta raíz
router.get('/', async (req, res) => {
  const token = req.cookies.rememberMeToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.session.userId = decoded.userId;

      // Busca al usuario para verificar su estado y rol
      const usuario = await Usuario.findById(decoded.userId)
        .populate('status') // Populate el campo status
        .populate('rol'); // Populate el campo rol

      if (usuario) {
        // Verifica el estado del usuario
        const estadoActivo = await EstatusD.findOne({ nombre: 'Activo' });
        if (usuario.status.equals(estadoActivo._id)) { 
          // Redirige al usuario a su vista predeterminada según su rol
          if (usuario.rol.nombre === 'Administrador') {
            res.redirect('/admin/home');
          } else if (usuario.rol.nombre === 'Evaluador') {
            res.redirect('/evaluador/home');
          } else if (usuario.rol.nombre === 'Mystery Shopper') {
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

router.get('/sobreNosotros', (req, res) => {
  res.render('home/sobreNosotros', { title: 'Incognito UTN | Sobre nosotros' });
});

export default router;