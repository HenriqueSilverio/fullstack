const express    = require('express');
const bodyParser = require('body-parser');
const api        = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ 'extended': true }));

require('./colors/routes')(api);

module.exports = api;
