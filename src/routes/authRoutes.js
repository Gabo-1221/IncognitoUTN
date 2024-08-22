// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();
import authController from '../controllers/auth/authController.js'; // Importar con ES Modules
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() }); // Configurar multer

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
  const userId = req.session.userId; 
  res.render('auth/selectRol', { userId: userId }); 
});

router.post('/rol_evaluador', authController.selectRolEvaluador);
router.post('/rol_mystery', authController.selectRolMystery);
router.post('/updateUserData', authController.updateUserData);
router.post('/updateUserPassword', authController.updateUserPassword);
// Ruta para actualizar la foto de perfil
router.post('/updateProfilePicture', upload.single('profilePicture'), authController.updateProfilePicture); 
router.get('/logout', authController.logout);

export default router; // Exportar el router usando ES Modules