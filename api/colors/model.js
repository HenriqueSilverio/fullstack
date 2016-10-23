const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const colorSchema = new schema({
  name: String,
  code: String
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
