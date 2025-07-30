// API/app/controllers/usuarios.js
const express = require('express');
const router  = express.Router();
const Usuario = require('../models/Usuario');

// Create
router.post('/', async (req, res) => {
  try {
    const u = await Usuario.create(req.body);
    res.status(201).json(u);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const list = await Usuario.find();
  res.json(list);
});

// Read by ID
router.get('/:id', async (req, res) => {
  const u = await Usuario.findById(req.params.id);
  if (!u) return res.status(404).json({ error: 'No encontrado' });
  res.json(u);
});

// Update
router.put('/:id', async (req, res) => {
  const u = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(u);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
});
