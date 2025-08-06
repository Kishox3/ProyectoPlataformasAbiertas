// API/app/controllers/ventas.js
const express = require('express');
const router  = express.Router();
const Venta = require('../models/Venta');
const Prenda = require('../models/Prenda');

// Create
router.post('/', async (req, res) => {
  try {
    // 1. Obtener la prenda
    const prenda = await Prenda.findById(req.body.prenda);
    if (!prenda) return res.status(404).json({ error: "Prenda no encontrada" });

    // 2. Calcular total y fecha
    const cantidad = Number(req.body.cantidad);
    const total = prenda.precio * cantidad;
    const fecha_venta = new Date();

    // 3. Verificar stock suficiente
    if (prenda.cantidad_stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente" });
    }

    // 4. Restar stock
    prenda.cantidad_stock -= cantidad;
    await prenda.save();

    // 5. Crear venta
    const venta = await Venta.create({
      prenda: prenda._id,
      usuario: req.body.usuario,
      cantidad,
      total,
      fecha_venta
    });

    res.status(201).json(venta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const list = await Venta.find().populate('prenda usuario');
  res.json(list);
});

// Read by ID
router.get('/:id', async (req, res) => {
  const v = await Venta.findById(req.params.id).populate('prenda usuario');
  res.json(v);
});

// Update
router.put('/:id', async (req, res) => {
  const v = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(v);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Venta.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Venta eliminada' });
});

module.exports = router;