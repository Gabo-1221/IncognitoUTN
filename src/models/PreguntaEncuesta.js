const mongoose = require('mongoose');

const preguntaEncuestaSchema = new mongoose.Schema({
  id_encuesta: { type: Number, default: null },
  id_pregunta: { type: Number, default: null },
});

module.exports = mongoose.model('PreguntaEncuesta', preguntaEncuestaSchema);
