const mongoose = require('mongoose');

const preguntaEncuestaSchema = new mongoose.Schema({
  id_encuesta: { type: String, default: null },
  id_pregunta: { type: String, default: null },
});

module.exports = mongoose.model('PreguntaEncuesta', preguntaEncuestaSchema);
