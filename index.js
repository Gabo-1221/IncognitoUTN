import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import authRoutes from './src/routes/authRoutes.js';
import mysteryRoutes from './src/routes/mysteryRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import evaluerRoutes from './src/routes/evaluerRoutes.js';
import formsRoutes from './src/routes/formsRoutes.js';
import homeRoutes from './src/routes/homeRoutes.js';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

dotenv.config();
connectDB();

const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
/* generar llaves */
/* const secret = crypto.randomBytes(64).toString('hex'); 
console.log(secret); */
// Configura las sesiones
app.use(session({
  secret: process.env.SESSION_SECRET, // Reemplaza con un secreto seguro
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Configura la seguridad de la cookie según sea necesario
}));
// Usa connect-flash
app.use(flash());
// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'src/views'));
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar cuerpos de solicitud
app.use(express.json()); // Para solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para solicitudes URL-encoded


//app.use(express.static(path.join(__dirname, 'public')));


// Importar y usar rutas
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/evaluador', evaluerRoutes);
app.use('/mystery', mysteryRoutes);
app.use('/forms', formsRoutes);
app.use('/', homeRoutes);

// Middleware para almacenar el userId en res.locals
function guardarUserId(req, res, next) {
  if (req.session && req.session.userId) {
    res.locals.userId = req.session.userId;
  }
  next();
}

// Middleware para verificar la autenticación
function isAuthenticated(req, res, next) {
  // Verifica si el usuario está autenticado mediante la sesión
  if (req.session && req.session.userId) {
    return next();
  }

  // Verifica si el usuario tiene una cookie "rememberMeToken"
  const token = req.cookies.rememberMeToken;

  if (token) {
    try {
      // Verifica el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guarda el ID del usuario en la sesión
      req.session.userId = decoded.userId;

      // Continúa con la solicitud
      return next();
    } catch (error) {
      // El token es inválido o ha expirado
      console.error('Error al verificar el token:', error);
    }
  }

  // El usuario no está autenticado
  res.redirect('/auth/login');
}

// Usa el middleware isAuthenticated en las rutas protegidas
// Usa el middleware isAuthenticated en las rutas protegidas
app.use('/admin', isAuthenticated, adminRoutes); 
app.use('/evaluador', isAuthenticated, evaluerRoutes); // Haz lo mismo para 


// Manejar rutas no encontradas
app.use((req, res) => {
  /* res.status(404).send('No se encuentra la ruta establecida'); */
  res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
