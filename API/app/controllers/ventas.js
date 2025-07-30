// API/app/controllers/ventas.js
const express = require('express');
const router  = express.Router();
const Venta = require('../models/Venta');

// Create
router.post('/', async (req, res) => {
  const v = await Venta.create(req.body);
  res.status(201).json(v);
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

