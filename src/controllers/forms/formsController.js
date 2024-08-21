//src /controllers/formsController.js
const Pregunta = require('../../models/Pregunta')
const Categoria = require('../../models/Categoria')
const Area = require('../../models/Area')
const Encuesta = require('../../models/Encuesta')
const EncPre = require('../../models/PreguntaEncuesta')
const Usu = require('../../models/Usuario')
//controlador para evaluador
exports.newQuestion = async (req, res) => {
    try {
        const { pregunta, categoria, user } = req.body;
        const newQuestion = new Pregunta({
            nombre: pregunta,
            id_categoria: categoria,
            id_creo: user
        });

        await newQuestion.save();

        res.redirect('/admin/listaPreguntas')
    } catch (error) {
        console.log("algo salio mal")
        console.log(error)
    }
}

exports.findOnePregunta = async(req, res) => {
    const {idPregunta} = req.params 
    console.log(idPregunta)
    try{
        const pregunta = await Pregunta.findById(idPregunta);
        console.log(pregunta)
        // Renderizas el formulario con los datos de la pregunta y la categoría
        res.json({
            title:" Editor Pregunta",
            id: pregunta._id,
            pregunta: pregunta.nombre,
            categoria: pregunta.id_categoria,  // ID de la categoría seleccionada
            creadoPor: pregunta.id_creo
          });
    }catch(error){
        console.log(error)
    }
}

exports.updateAsk = async (req, res) => {
    const {id, pregunta, categoria, user} = req.body;
    console.log(req.body)
    await Pregunta.findByIdAndUpdate(id,{
        nombre: pregunta, 
        id_categoria: categoria, 
        id_creo: user
    })
    res.redirect('/admin/listaPreguntas')
}

exports.deletePregunta = async (req, res) => {
    try{
        const {idpregunta} = req.params;
        console.log(req.params)
        await EncPre.deleteMany({id_pregunta:idpregunta})
        await Pregunta.findByIdAndDelete(idpregunta);
        res.redirect('/admin/listaPreguntas')
    }catch(error){
        console.log(error)
    }
}

exports.newCategoria = async (req, res) => {
    try {
        const { categoria, user } = req.body;
        const newCategoria = new Categoria({
            nombre: categoria,
            id_creo: user
        })
        await newCategoria.save()

        res.redirect('/admin/listaCategorias')
    } catch (error) {
        console.log(error)
    }

}

exports.findOneCategoria = async(req, res) => {
    const {idCategoria} = req.params 
    console.log(idCategoria)
    try{
        const categoria = await Categoria.findById(idCategoria);
        console.log(categoria)
        // Renderizas el formulario con los datos de la pregunta y la categoría
        res.json({
            title:" Editor Categoria",
            id: categoria._id,
            categoria: categoria.nombre, 
            creadoPor: categoria.id_creo
          });
    }catch(error){
        console.log(error)
    }
}

exports.updateCategoria = async (req, res) => {
    const {id, categoria, user} = req.body;
    console.log(req.body)
    await Categoria.findByIdAndUpdate(id,{
        nombre: categoria, 
        id_creo: user
    })
    res.redirect('/admin/listaCategorias')
}

exports.deleteCategoria = async (req, res) => {
    try{
        const {idcategoria} = req.params;
        console.log(req.params)
        await Pregunta.deleteMany({id_categoria: idcategoria})
        await Categoria.findByIdAndDelete(idcategoria);
        res.redirect('/admin/listaCategorias')
    }catch(error){
        console.log(error)
    }
}

exports.newArea = async (req, res) => {
    try {
        const { area, calificacion, user } = req.body;
        const newArea = new Area({
            nombre: area,
            promedio: calificacion,
            id_creo: user
        })
        await newArea.save()
        res.redirect('/admin/listaAreas')
    } catch (error) {
        console.log(error)
    }
}

exports.findOneArea = async(req, res) => {
    const {idArea} = req.params 
    console.log(idArea)
    try{
        const area = await Area.findById(idArea);
        console.log(area)
        // Renderizas el formulario con los datos de la pregunta y la categoría
        res.json({
            title:" Editor Area",
            id: area._id,
            area: area.nombre, 
            promedio: area.promedio, 
            creadoPor: area.id_creo
          });
    }catch(error){
        console.log(error)
    }
}

exports.updateArea= async (req, res) => {
    const {id, area, promedio, user} = req.body;
    console.log(req.body)
    await Area.findByIdAndUpdate(id,{
        nombre: area, 
        promedio: promedio, 
        id_creo: user
    })
    res.redirect('/admin/listaAreas')
}

exports.deleteArea = async (req, res) => {
    try{
        const {idArea} = req.params;
        console.log(req.params)
        const encuestas = await Encuesta.find({id_area: idArea}, { nombre: 1, _id: 1 })
        console.log(encuestas);
        for (let encu of encuestas) {
            try {
                await EncPre.deleteMany({ id_encuesta: encu._id })
            } catch (error) {
                console.log(error)
            }
        }
        await Encuesta.deleteMany({id_area: idArea})
        await Area.findByIdAndDelete(idArea);
        res.redirect('/admin/listaAreas')
    }catch(error){
        console.log(error)
    }
}

exports.newEncuesta = async (req, res) => {
    try {
        const { nombre, area, canperson, user, fechat } = req.body;
        const currentDate = new Date();
        const utcDate = currentDate.toLocaleDateString('en-CA');
        const newEncuesta = new Encuesta({
            nombre: nombre,
            id_area: area,
            id_encargado: user,
            fecha_creada: utcDate,
            fecha_limite: fechat,
            cantidad: canperson,
            calificacion: 4.9
        })
        await newEncuesta.save()
        res.status(200)
        //res.redirect('/admin/listaAreas')
    } catch (error) {
        console.log(error)
    }
}

exports.deleteEncuesta = async (req, res) => {
    try{
        const {idEncuesta} = req.params;
        console.log(req.params)

        await EncPre.deleteMany({ id_encuesta: idEncuesta });
 
        await Encuesta.findByIdAndDelete(idEncuesta); 
        res.redirect('/admin/listaEncuesta')
    }catch(error){
        console.log(error)
    }
}

exports.newEncPreg = async (req, res) => {
    const { encuestaId, preguntasSeleccionadas } = req.body;
  
    try {
      for (const pregunta of preguntasSeleccionadas) {
        try {
          const newEncPre = new EncPre({
            id_encuesta: encuestaId,
            id_pregunta: pregunta,
          });
          await newEncPre.save();
        } catch (error) {
          console.error('Error al guardar la pregunta:', error);
          return res.status(500).json({ error: 'Error al guardar la pregunta' });
        }
      }
      res.json({ message: 'Preguntas guardadas correctamente' });
    } catch (error) {
      console.error('Error en newEncPreg:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  };