//src /controllers/formsController.js
const Pregunta = require('../../models/Pregunta')
const Categoria = require('../../models/Categoria')
const Area = require('../../models/Area')
const Encuesta = require('../../models/Encuesta')
const EncPre = require('../../models/PreguntaEncuesta')
//controlador para evaluador
exports.newQuestion = async (req, res) => {
    try {
        const {pregunta,categoria,user} = req.body;
        const newQuestion = new Pregunta({
            nombre: pregunta,
            id_categoria: categoria,
            id_creo : user
        });
    
    await newQuestion.save();
    
        res.redirect('/admin/listaPreguntas')
    } catch (error) {
        console.log("algo salio mal")
        console.log(error)
    }
}

exports.newCategoria = async (req, res) => {
    try {
        const {categoria, user} = req.body;
        const newCategoria = new Categoria ({
            nombre: categoria,
            id_creo: user
        })
        await newCategoria.save()

        res.redirect('/admin/listaCategorias')
    } catch (error) {
        console.log(error)
    }

}

exports.newArea = async (req, res) => {
    try {
        const {area, calificacion,user} = req.body;
        const newArea = new Area ({
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

exports.newEncuesta = async (req, res) => {
    try {
        const {nombre,area, canperson,user,fechat} = req.body;
        const currentDate = new Date();
        const utcDate = currentDate.toLocaleDateString('en-CA');
        const newEncuesta = new Encuesta ({
            nombre: nombre,
            id_area: area,
            id_encargado: user,
            fecha_creada: utcDate,
            fecha_limite: fechat,
            cantidad: canperson 
        })
    await newEncuesta.save()
    res.status(200)
    //res.redirect('/admin/listaAreas')
    } catch (error) {   
        console.log(error)
    }
}

exports.newEncPreg = async ( req, res) => {
    const {encuestaId , preguntasSeleccionadas} = req.body;
    preguntasSeleccionadas.forEach( async (pregunta) => {
    try {
        const newEncPre = new EncPre ({
            id_encuesta: encuestaId,
            id_pregunta: pregunta
        });
        console.log(preguntasSeleccionadas);
        res.redirect('/admin/listaEncuesta')
    await newEncPre.save();
    } catch (error) {
        console.log(error)
    }
});
} 