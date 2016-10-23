const express = require('express');
const db      = require('./config');
const api     = require('./api/api');
const app     = express();

app.use(express.static('./dist'));
app.use(api);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
