const express    = require('express');
const bodyParser = require('body-parser');
const api        = express();

api.use(bodyParser.json());

require('./colors/routes')(api);

module.exports = api;
