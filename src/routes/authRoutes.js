// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');

router.get('/', (req, res) => {
    res.render('home/home', { title: 'Incognito UTN' });
  });

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
