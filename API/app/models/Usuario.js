// API/app/models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  rol: String,
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
