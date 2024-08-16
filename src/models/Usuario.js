const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  apellidos: { type: String, default: null },
  fecha_nac: { type: String, default: null },
  correo: { type: String, default: null },
  contrasena: { type: String, default: null },
  rol: { type: String, default: null },
  terms: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  encuestas_creadas: { type: Array, default: [] },
  encuestas_resueltas: { type: Array, default: [] },
  updated_at: { type: Date, default: Date.now },
  status: { type: String, default: null }
});

module.exports = mongoose.model('usuarios', usuarioSchema);
