// models/UsuarioRespuestaEncuestas.js

import mongoose from 'mongoose';

const usuarioRespuestaEncuestaSchema = new mongoose.Schema({
  id_encuesta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'encuestas', 
    required: true 
  },
  id_usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuarios',
    required: true
  },
  calificacion: { 
    type: Number, 
    required: true 
  }
});

const UsuarioRespuestaEncuesta = mongoose.model('usuariorespuestaencuestas', usuarioRespuestaEncuestaSchema);

export default UsuarioRespuestaEncuesta; 