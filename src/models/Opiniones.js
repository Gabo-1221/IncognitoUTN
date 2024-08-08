const mongoose = require('mongoose');

const opinionesSchema = new mongoose.Schema({
  comentario: { type: String, default: null },
  id_encuesta: { type: Number, default: null },
});

module.exports = mongoose.model('Opiniones', opinionesSchema);
