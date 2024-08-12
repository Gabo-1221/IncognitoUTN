const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  area: { type: Number, default: null },
  id_encargado: { type: Number, default: null },
  fecha_limite: { type: Date, default: null },
  cantidad: { type: Number, default: null },
  calificacion: { type: Number, default: null },
});

module.exports = mongoose.model('Encuesta', encuestaSchema);
