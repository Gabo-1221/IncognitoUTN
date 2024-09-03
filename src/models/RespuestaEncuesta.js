// models/RespuestaEncuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const respuestaEncuestaSchema = new mongoose.Schema({
  id_encuesta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'encuestas'
  },
  id_pregunta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'preguntas'
  },
  respuesta: { type: Number, default: null },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios'
  },
});

const RespuestaEncuesta = mongoose.model('RespuestaEncuesta', respuestaEncuestaSchema);

export default RespuestaEncuesta;