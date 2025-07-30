// API/app/models/Marca.js
const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nombre: String,
  pais: String
});

module.exports = mongoose.model('Marca', marcaSchema);
