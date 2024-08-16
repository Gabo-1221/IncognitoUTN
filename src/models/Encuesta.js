const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_area: { type: String, default: null },
  id_encargado: { type: String, default: null },
  cantidad: { type: Number, default: null },
  fecha_creada: {type: Date, default: null},
  fecha_limite: { type: Date, default: null },
  calificacion: { type: Number, default: null },
});

module.exports = mongoose.model('encuestas', encuestaSchema);
