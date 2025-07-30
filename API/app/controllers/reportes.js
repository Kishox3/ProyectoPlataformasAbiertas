// API/app/controllers/reportes.js
const express = require('express');
const router  = express.Router();
const Prenda = require('../models/Prenda');
const Marca  = require('../models/Marca');
const Venta  = require('../models/Venta');

// GET /reportes/marcas-con-ventas
router.get('/marcas-con-ventas', async (req, res) => {
  // Lista de IDs de prendas vendidas
  const prendasVendidas = await Venta.distinct('prenda');
  // Busca las prendas y extrae sus marcas
  const prendas = await Prenda.find({ _id: { $in: prendasVendidas } }).populate('marca');
  // Unifica nombres de marcas
  const marcas = [...new Set(prendas.map(p => p.marca.nombre))];
  res.json(marcas);
});

// GET /reportes/prendas-stock
router.get('/prendas-stock', async (req, res) => {
  // Total vendido por prenda
  const agg = await Venta.aggregate([
    { $group: { _id: '$prenda', totalVendido: { $sum: '$cantidad' } } }
  ]);
  // Calcula stock restante
  const resultado = await Promise.all(
    agg.map(async ({ _id, totalVendido }) => {
      const pr = await Prenda.findById(_id);
      return {
        prenda: pr.nombre,
        stockRestante: pr.cantidad_stock - totalVendido
      };
    })
  );
  res.json(resultado);
});

// GET /reportes/ventas-por-fecha?fecha=YYYY-MM-DD
router.get('/ventas-por-fecha', async (req, res) => {
  const fecha = new Date(req.query.fecha);
  // Agrupa por prenda sumando cantidad vendida en esa fecha
  const agg = await Venta.aggregate([
    { $match: { fecha_venta: fecha } },
    { $group: { _id: '$prenda', totalVendida: { $sum: '$cantidad' } } }
  ]);
  res.json(agg);
});

// GET /reportes/top5-marcas
router.get('/top5-marcas', async (req, res) => {
  // Agrega datos de prenda
  const agg = await Venta.aggregate([
    {
      $lookup: {
        from: 'prendas',
        localField: 'prenda',
        foreignField: '_id',
        as: 'prendaInfo'
      }
    },
    { $unwind: '$prendaInfo' },
    {
      $group: {
        _id: '$prendaInfo.marca',
        ventas: { $sum: '$cantidad' }
      }
    },
    { $sort: { ventas: -1 } },
    { $limit: 5 }
  ]);
  // Mapea a nombres
  const top = await Promise.all(
    agg.map(async ({ _id, ventas }) => {
      const m = await Marca.findById(_id);
      return { marca: m.nombre, ventas };
    })
  );
  res.json(top);
});

module.exports = router;
