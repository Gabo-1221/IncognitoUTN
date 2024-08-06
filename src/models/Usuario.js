const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  apellidos: { type: String, default: null },
  edad: { type: Number, default: null },
  correo: { type: String, default: null },
  contrasena: { type: String, default: null },
  rol: { type: Number, default: null },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
