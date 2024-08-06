const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  nombre: { type: Number, default: null },
  id_categoria: { type: Number, default: null },
  id_creo: { type: Number, default: null },
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
