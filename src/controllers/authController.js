'use strict'

const express = require('express');
const User = require('../models/user');

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
})


module.exports = app => app.use('./auth', router);

