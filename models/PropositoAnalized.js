const mongoose = require('mongoose');

const PropositoAnalizedSchema = new mongoose.Schema({
  texto: String,
  emocion: String,
  tipo: String, 
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PropositoAnalized', PropositoAnalizedSchema);
