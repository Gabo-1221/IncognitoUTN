// models/Categoria.js (o el nombre del archivo)
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_creo: { 
    type: mongoose.Schema.Types.ObjectId, // Cambiar el tipo a ObjectId
    ref: 'usuarios' // Referencia al modelo de usuarios
  },
  color_hover: { type: String, default: null },
});

const Categoria = mongoose.model('categorias', categoriaSchema);

export default Categoria;