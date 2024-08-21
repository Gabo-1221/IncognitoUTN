const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_creo: { type: String, default: null },
});

module.exports = mongoose.model('categorias', categoriaSchema);
