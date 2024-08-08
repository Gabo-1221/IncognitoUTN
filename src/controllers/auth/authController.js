// src/controllers/auth/authController.js

// Muestra el formulario de inicio de sesión
exports.formLogin = (req, res) => {
  res.render('auth/formLogin', { title: 'Inicio de sesión' });
};

// Maneja el inicio de sesión
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);
  // Lógica de autenticación para login
  res.send('Login exitoso email: ' + email);
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
