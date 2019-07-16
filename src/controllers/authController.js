'use strict'

const express = require('express');
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authHash = require('../config/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
   const { email } = req.body;
   try {
      if (await User.findOne({ email }))
         return res.status(400).send('Usuário já cadastrado!');

      const user = await User.create(req.body);

      user.pass = undefined;

      return res.status(201).send({ user })
   } catch (error) {
      return res.status(400).send({ 'error': 'Falha no registro!' });
   }
});

router.post('/authenticate', async (req, res) => {
   try {
      const { email, pass } = req.body;

      const user = await User.findOne({ email }).select('+pass');

      if (!user)
         return res.status(400).send({ error: 'Usuario não encontrado!' });
      if (! await bcrypt.compare(pass, user.pass))
         return res.status(400).send({ error: 'Senha Invalida! Tente novamente' });

      user.pass = undefined;

      const token = jwt.sign({ id: user.id }, authHash.secret, {
         expiresIn: 86400,
      });

      res.send({ user, token });


   } catch (error) {

   }
});


module.exports = app => app.use('./auth', router);

