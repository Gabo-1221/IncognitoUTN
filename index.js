const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
// Importa connect-flash
const flash = require('connect-flash');

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
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para analizar cuerpos de solicitud
app.use(express.json()); // Para solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para solicitudes URL-encoded

app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./src/routes/authRoutes'); // Verifica la ruta correcta
const mysteryRoutes = require('./src/routes/mysteryRoutes');
const { error } = require('console');
const { moveMessagePortToContext } = require('worker_threads');

// Importar y usar rutas
/* app.use('/auth', require('./src/routes/authRoutes')); */
app.use('/auth', authRoutes);
app.use('/admin', require('./src/routes/adminRoutes'));
app.use('/evaluador', require('./src/routes/evaluerRoutes'));
app.use('/mystery', mysteryRoutes);
app.use('/forms', require('./src/routes/formsRoutes'));
app.use('/', require('./src/routes/homeRoutes'));

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
app.use('/admin', isAuthenticated, require('./src/routes/adminRoutes'));
app.use('/evaluador', isAuthenticated, require('./src/routes/evaluerRoutes'));


// Manejar rutas no encontradas
app.use((req, res) => {
  /* res.status(404).send('No se encuentra la ruta establecida'); */
  res.status(404).render('layout/error', { title: 'Incognito UTN | Error 404 :c', message: 'No se encuentra la ruta establecida'+ error });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
