// controllers/auth/authController.js
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
    // Lógica de autenticación para login
    res.send('Login exitoso');
  };
  
  exports.register = async (req, res) => {
    // Lógica de registro de usuarios
    /* const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age; */
    const { username, age } = req.body;
    res.send(`Registro exitoso ${username}`);
    console.log(username)
  };

  exports.formRegistrar = (req, res) => {
    res.render('auth/formRegistro',{title : "Registro"})
  }
  