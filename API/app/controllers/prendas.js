// API/app/controllers/prendas.js
const express = require('express');
const router  = express.Router();
const Prenda = require('../models/Prenda');

// Create
router.post('/', async (req, res) => {
  const p = await Prenda.create(req.body);
  res.status(201).json(p);
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
