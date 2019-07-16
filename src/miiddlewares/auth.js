'use strict'

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Token não informado!' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Erro no Token!' });

    const [scheme, token] = parts;

    if (! /^Bearer$/i.compile.test(scheme))
        return res.status(401).send({ error: 'Erro no Token mau formatado!' });

    jwt.verify(token, authConfig, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Erro no Token invalido!' });
        req.userId = decoded.id;

        return next();
    });;

};