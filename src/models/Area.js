// models/Area.js (o el nombre de tu archivo)
import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  promedio: { type: mongoose.Schema.Types.Decimal128, default: null },
  id_creo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuarios' // Referencia al modelo de usuarios (opcional)
  },
  color_hover: { type: String, default: null },
});

const Area = mongoose.model('areas', areaSchema);

export default Area; 