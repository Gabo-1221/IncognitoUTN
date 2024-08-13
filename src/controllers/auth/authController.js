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

// Muestra el formulario de inicio de sesión
exports.formLogin = (req, res) => {
  res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión' });
};

// Maneja el inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body;
  // Lógica de autenticación para login
  //res.send('Login exitoso email: ' + email);
};

// Maneja el registro de usuarios
exports.register = async (req, res) => {
  const { username, age } = req.body;
  console.log('Username:', username);
  console.log('Age:', age);
  // Aquí puedes agregar la lógica para guardar el usuario en la base de datos
  res.send(`Registro exitoso ${username}`);
};

// Muestra el formulario de registro
exports.formRegistrar = (req, res) => {
  res.render('auth/formRegistro', { title: 'Registro' });
};
