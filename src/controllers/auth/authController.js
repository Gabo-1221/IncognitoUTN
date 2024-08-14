// controllers/auth/authController.js
const bcrypt = require('bcrypt');
const Usuario = require('../../models/Usuario');
// Muestra el formulario de inicio de sesión
exports.formLogin = (req, res) => {
  res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión' });
};

// Maneja el inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca al usuario por correo electrónico
    const usuario = await Usuario.findOne({ correo: email });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Compara la contraseña ingresada con la contraseña encriptada
    const match = await bcrypt.compare(password, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Guarda el ObjectId del usuario en la sesión
    req.session.userId = usuario._id; 

    // Redirige al usuario según su rol
    if (usuario.rol === 3) {
      res.redirect('/admin/home');
    } else if (usuario.rol === 2) {
      res.redirect('/evaluador/home');
    } else if (usuario.rol === 1) {
      res.redirect('/mystery/home');
    }
    else {
      // Maneja el caso de un rol inválido
      res.status(500).json({ message: 'Rol inválido' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Muestra el formulario de registro
exports.formRegistrar = (req, res) => {
  res.render('auth/formRegistro', { title: 'Registro' });
};

// Maneja el registro de usuarios
exports.Register = async (req, res) => {
  try {
    const { username, lastname, fecha_nac, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const nuevoUsuario = new Usuario({
      nombre: username,
      apellidos: lastname,
      fecha_nac: fecha_nac,
      correo: email,
      contrasena: hashedPassword,
      rol: null
    });

    await nuevoUsuario.save();
    // Guarda el ObjectId del usuario en la sesión
    req.session.userId = nuevoUsuario._id;

    // Redirige al usuario a la ruta /admin/home
    res.redirect('/auth/selectRol');

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' + error });
  }
};

exports.selectRolEvaluador = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    /* ROLES: 1 "MYSTERY" 2 "EVALUADOR" 3 "ADMIN" */
    /* /evaluador/home */
    await Usuario.findByIdAndUpdate(userId, { rol: 2 });
    res.redirect('/evaluador/home');
  } catch (error) {
    console.error('Error al actualizar el rol a evaluador:', error);
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

exports.selectRolMystery = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    await Usuario.findByIdAndUpdate(userId, { rol: 1 });
    res.redirect('/mystery/home');
  } catch (error) {
    console.error('Error al actualizar el rol a mystery:', error);
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};


/* exports.selectRol = (req, res) => {
  const userId = req.session.userId;
  res.render('selectRol', { userId });
}; */
