// models/Encuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const encuestaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_area: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'areas' // Referencia al modelo 'areas'
  },
  id_encargado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuarios' // Referencia al modelo 'usuarios' (nombre del modelo Usuario)
  },
  cantidad: { type: Number, default: null },
  fecha_creada: { type: Date, default: null },
  fecha_limite: { type: Date, default: null },
  calificacion: { type: mongoose.Schema.Types.Decimal128, default: null },  
  id_usuarios_respondieron: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuarios' // Referencia al modelo 'usuarios'
  }],
});

const Encuesta = mongoose.model('encuestas', encuestaSchema);

export default Encuesta;