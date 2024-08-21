// src/controllers/forms/formsController.js
import Pregunta from '../../models/Pregunta.js';
import Categoria from '../../models/Categoria.js';
import Area from '../../models/Area.js';
import Encuesta from '../../models/Encuesta.js';
import EncPre from '../../models/PreguntaEncuesta.js';
//controlador para evaluador
export const newQuestion = async (req, res) => {
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

export const newCategoria = async (req, res) => {
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

export const newArea = async (req, res) => {
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

export const newEncuesta = async (req, res) => {
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
            cantidad: canperson
        })
        await newEncuesta.save()
        res.status(200)
        //res.redirect('/admin/listaAreas')
    } catch (error) {
        console.log(error)
    }
}
export const newEncPreg = async (req, res) => {
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

  const formsController = {
    newQuestion,
    newCategoria,
    newArea,
    newEncuesta,
    newEncPreg
  };
  
  export default formsController;