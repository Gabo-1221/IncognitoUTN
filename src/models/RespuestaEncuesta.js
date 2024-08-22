// models/RespuestaEncuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const respuestaEncuestaSchema = new mongoose.Schema({
  id_pregunta: { type: Number, default: null },
  respuesta: { type: Number, default: null },
  id_usuario: { type: Number, default: null },
});

const RespuestaEncuesta = mongoose.model('RespuestaEncuesta', respuestaEncuestaSchema);

export default RespuestaEncuesta;