// API/app/controllers/prendas.js
const express = require('express');
const router  = express.Router();
const Prenda = require('../models/Prenda');

// Create
router.post('/', async (req, res) => {
  try {
    // Buscar si ya existe una prenda con mismo nombre y marca
    const existente = await Prenda.findOne({ nombre: req.body.nombre, marca: req.body.marca });
    if (existente) {
      // Sumar stock
      existente.cantidad_stock += Number(req.body.cantidad_stock);
      await existente.save();
      return res.status(200).json(existente);
    }
    // Si no existe, crear nueva
    const p = await Prenda.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const list = await Prenda.find().populate('marca');
  res.json(list);
});

// Read by ID
router.get('/:id', async (req, res) => {
  const p = await Prenda.findById(req.params.id).populate('marca');
  res.json(p);
});

// Update
router.put('/:id', async (req, res) => {
  const p = await Prenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Prenda.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Prenda eliminada' });
});

module.exports = router;