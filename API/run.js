// API/run.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

// 1️⃣ – Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB conectado');

  // 2️⃣ – Crear instancia de Express solo después de conectar
  const app = express();

  // 3️⃣ – Middlewares
  app.use(cors());
  app.use(express.json());

  // 4️⃣ – Rutas
  const rutas = require('./app/routes');
  app.use('/tienda/api/v1', rutas);

  // 5️⃣ – Iniciar servidor
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API corriendo en puerto ${PORT}`);
  });

})
.catch(err => {
  console.error('❌ Error de conexión a MongoDB:', err.message);
  process.exit(1); // Sale si no se conecta
});
