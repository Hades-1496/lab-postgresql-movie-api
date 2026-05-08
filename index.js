// .index.js
require('dotenv').config();
require('./src/config/db')
const express = require('express');
const peliculasRouter = require('./src/routes/peliculas.js')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Rutas
app.use('/api/peliculas', peliculasRouter)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` });
});
app.use((err, req, res, next) => {
  // Si el error trae su propio código (ej. el 404 o 400 de AppError), lo usa. Si no, usa 500.
  const statusCode = err.statusCode || 500; 
  
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Error interno del servidor',
  });
});
app.listen(PORT, () => {console.log(`Servidor corriendo en http://localhost:${PORT}`)});

