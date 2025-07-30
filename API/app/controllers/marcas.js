// API/app/controllers/marcas.js
const router = require('express').Router();
const Marca = require('../models/Marca');

// Create
router.post('/', async (req, res) => {
  const m = await Marca.create(req.body);
  res.status(201).json(m);
});

// Read all
router.get('/', async (req, res) => {
  const list = await Marca.find();
  res.json(list);
});

// Read by ID
router.get('/:id', async (req, res) => {
  const m = await Marca.findById(req.params.id);
  res.json(m);
});

// Update
router.put('/:id', async (req, res) => {
  const m = await Marca.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(m);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Marca.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Marca eliminada' });
});

module.exports = router;
