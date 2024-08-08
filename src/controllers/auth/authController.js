// controllers/auth/authController.js
exports.login = (req, res) => {
    // Lógica de autenticación para login
    res.send('Login exitoso');
  };
  
  exports.register = async (req, res) => {
    // Lógica de registro de usuarios
    /* const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age; */
    const { username, lastname,age } = req.body;
    res.send(`Registro exitoso ${username} ${lastname} con edad de ${age}`);
    console.log(req.body)
  };

  exports.formRegistrar = (req, res) => {
    res.render('auth/formRegistro',{title : "Registro"})
  }
  
