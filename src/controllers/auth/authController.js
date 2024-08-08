// controllers/auth/authController.js
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
    // Lógica de autenticación para login
    res.send('Login exitoso');
  };
  
  exports.register = (req, res) => {
    // Lógica de registro de usuarios
    res.send('Registro exitoso');
  };
  