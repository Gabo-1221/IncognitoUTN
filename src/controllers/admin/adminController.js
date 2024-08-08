// src/controllers/admin/adminController.js

// Controlador para renderizar la vista homeAdmin
exports.getHomeAdmin = (req, res) => {
    res.render('admin/homeAdmin', { title: 'Página de Administración' });
  };
  