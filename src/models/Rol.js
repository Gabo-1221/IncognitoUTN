const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
});

module.exports = mongoose.model('roles', rolSchema);
