// models/Opiniones.js (o el nombre del archivo)
import mongoose from 'mongoose';

const opinionesSchema = new mongoose.Schema({
  comentario: { type: String, default: null },
  id_encuesta: { type: Number, default: null },
});

const Opinion = mongoose.model('Opiniones', opinionesSchema);

export default Opinion;