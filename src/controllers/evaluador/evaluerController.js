//src /controllers/evaluador/evaluerController.js

//controlador para evaluador
exports.getHomeEvaluer = (req, res) => {
    res.render('evaluer/homeEvaluer', {title: 'Evaluador'});
}