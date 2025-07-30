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

