// API/run.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const rutas = require('./app/routes');
app.use('/tienda/api/v1', rutas);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
