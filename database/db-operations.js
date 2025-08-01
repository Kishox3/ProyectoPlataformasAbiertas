// database/db-operations.js
require('dotenv').config();
const mongoose = require('mongoose');

// 1. Conexión
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Error de conexión:', err));

// 2. Esquemas
const usuarioSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  rol: String,
  fecha_creacion: { type: Date, default: Date.now }
});

const marcaSchema = new mongoose.Schema({
  nombre: String,
  pais: String
});

const prendaSchema = new mongoose.Schema({
  nombre: String,
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca' },
  precio: Number,
  cantidad_stock: Number
});

const ventaSchema = new mongoose.Schema({
  prenda: { type: mongoose.Schema.Types.ObjectId, ref: 'Prenda' },
  fecha_venta: Date,
  cantidad: Number,
  total: Number,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

// 3. Modelos
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Marca   = mongoose.model('Marca', marcaSchema);
const Prenda  = mongoose.model('Prenda', prendaSchema);
const Venta   = mongoose.model('Venta', ventaSchema);

module.exports = { Usuario, Marca, Prenda, Venta, mongoose };

// --- CRUD Básico ---

// Insertar un usuario
async function crearUsuario(data) {
  return await Usuario.create(data);
}

// Insertar varias marcas
async function crearMarcas(lista) {
  return await Marca.insertMany(lista);
}

// Actualizar una prenda por ID
async function actualizarPrenda(id, cambios) {
  return await Prenda.findByIdAndUpdate(id, cambios, { new: true });
}

// Eliminar una venta por ID
async function eliminarVenta(id) {
  return await Venta.findByIdAndDelete(id);
}

module.exports = {
  crearUsuario,
  crearMarcas,
  actualizarPrenda,
  eliminarVenta,
  // …exporta también los modelos si los usas directo
};

// --- Consultas Avanzadas ---

/** 
 * Obtener cantidad vendida de prendas en una fecha específica.
 * @param {Date} fecha 
 */
async function ventasPorFecha(fecha) {
  return await Venta.aggregate([
    { $match: { fecha_venta: fecha } },
    { $group: { _id: '$prenda', totalVendida: { $sum: '$cantidad' } } }
  ]);
}

/** 
 * Lista de marcas con al menos una venta.
 */
async function marcasConVenta() {
  return await Venta.distinct('prenda')
    .then(prendas => Prenda.find({ _id: { $in: prendas } }).populate('marca'))
    .then(prs => [...new Set(prs.map(p => p.marca.nombre))]);
}

/** 
 * Prendas vendidas y stock restante.
 */
async function prendasStock() {
  const vendidas = await Venta.aggregate([
    { $group: { _id: '$prenda', totalVendida: { $sum: '$cantidad' } } }
  ]);
  return await Promise.all(
    vendidas.map(async v => {
      const pr = await Prenda.findById(v._id);
      return {
        prenda: pr.nombre,
        stockRestante: pr.cantidad_stock - v.totalVendida
      };
    })
  );
}

/** 
 * Top 5 marcas más vendidas.
 */
async function top5Marcas() {
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
  return await Promise.all(
    agg.map(async a => {
      const m = await Marca.findById(a._id);
      return { marca: m.nombre, ventas: a.ventas };
    })
  );
}

// Inserta varios usuarios en la colección usuarios
async function crearUsuarios(lista) {
  return await Usuario.insertMany(lista);
}

// Inserta varias prendas en la colección prendas
async function crearPrendas(lista) {
  return await Prenda.insertMany(lista);
}

// Inserta varias ventas en la colección ventas
async function crearVentas(lista) {
  return await Venta.insertMany(lista);
}

module.exports = {
  // …tus funciones CRUD
  ventasPorFecha,
  marcasConVenta,
  prendasStock,
  top5Marcas
};
