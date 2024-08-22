// models/Categoria.js (o el nombre del archivo)
import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_creo: { type: Number, default: null },
});

const Categoria = mongoose.model('categorias', categoriaSchema);

export default Categoria;