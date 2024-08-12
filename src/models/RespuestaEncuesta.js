const mongoose = require('mongoose');

const respuestaEncuestaSchema = new mongoose.Schema({
  id_pregunta: { type: Number, default: null },
  respuesta: { type: Number, default: null },
  id_usuario: { type: Number, default: null },
});

module.exports = mongoose.model('RespuestaEncuesta', respuestaEncuestaSchema);
