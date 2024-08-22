// models/Area.js (o el nombre de tu archivo)
import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  promedio: { type: Number, default: null },
  id_creo: { type: Number, default: null },
});

const Area = mongoose.model('areas', areaSchema);

export default Area; 