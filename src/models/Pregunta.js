const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  nombre: { type: String , default: null },
  id_categoria: { type: String, default: null },
  id_creo: { type: Number, default: null },
});

module.exports = mongoose.model('preguntas', preguntaSchema);
