// API/app/models/Venta.js
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  prenda: { type: mongoose.Schema.Types.ObjectId, ref: 'Prenda' },
  fecha_venta: Date,
  cantidad: Number,
  total: Number,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Venta', ventaSchema);
