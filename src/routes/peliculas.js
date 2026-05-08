// src/routes/peliculas.js Que se llame igual que data me parece feo. Lo mantengo para no liar la IA al corregirlo.

const { Router } = require("express");

const {
  listarPeliculas,
  obtenerPeliculas,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
  listarResenias,
  crearResenias,
  obtenerEstadisticas
} = require("../controller/PeliculaController.js");

const router = Router();

router.get("/", listarPeliculas);
router.post("/", crearPelicula);
router.get('/estadisticas', obtenerEstadisticas);
router.get("/:id", obtenerPeliculas);
router.put("/:id", actualizarPelicula);
router.delete("/:id", eliminarPelicula);
router.get("/:id/resenas", listarResenias);
router.post("/:id/resenas", crearResenias);

module.exports = router;
