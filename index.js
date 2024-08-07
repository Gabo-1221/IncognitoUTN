const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importar y usar rutas
app.use('/api/auth', require('./src/routes/authRoutes'));


app.use('/api', require('./src/routes'));
//./src/routes
// Ruta para renderizar una vista de ejemplo con EJS
app.get('/', (req, res) => {
  res.render('home/home', { title: 'Página Principal sin login' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
