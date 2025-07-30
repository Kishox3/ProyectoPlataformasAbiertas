// API/app/models/Prenda.js
const mongoose = require('mongoose');

const prendaSchema = new mongoose.Schema({
  nombre: String,
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca' },
  precio: Number,
  cantidad_stock: Number
});

module.exports = mongoose.model('Prenda', prendaSchema);
