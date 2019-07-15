'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds135983.mlab.com:35983/api-rest', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;


