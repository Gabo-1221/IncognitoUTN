const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  promedio: { type: Number, default: null },
  id_creo: { type: Number, default: null },
});

module.exports = mongoose.model('areas', areaSchema);
