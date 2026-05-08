// src/controllers/ peliculasController.js

const db = require("../services/PeliculaService.js");

// Copio de del index directamente.
const listarPeliculas = async (req, res, next) => {
  try {
    const { genero } = req.query;
    const peliculas = await db.obtenerTodas({ genero });
    res.json(peliculas);
  } catch (err) {
    next(err);
  }
};

const obtenerPeliculas = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pelicula = await db.obtenerPorId(id);
    res.json(pelicula);
  } catch (err) {
    next(err);
  }
};

const crearPelicula = async (req, res, next) => {
  try {
    const { titulo, director_id, anio, genero_id, nota } = req.body;
    const nuevaPelicula = await db.crear({
      titulo,
      director_id,
      anio: Number(anio),
      genero_id,
      nota: nota ? Number(nota) : null, // Modificado
    });

    res.status(201).json(nuevaPelicula);
  } catch (err) {
    next(err);
  }
};

const actualizarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { titulo, director_id, anio, genero_id, nota } = req.body;
    const actualizada = await db.actualizar(id, {
      titulo,
      director_id,
      anio: Number(anio),
      genero_id,
      nota: nota ? Number(nota) : null,
    });
    res.json(actualizada);
  } catch (err) {
    next(err);
  }
};

const eliminarPelicula = async (req, res, next) => {
  //Casi idéntica a búsqueda de películas por id.
  try {
    const id = Number(req.params.id);
    const eliminada = await db.eliminar(id);

    res.json({ mensaje: "Película eliminada", pelicula: eliminada });
  } catch (err) {
    next(err);
  }
};

const obtenerEstadisticas = async (req, res, next) => {
  try {
    res.json(await db.obtenerEstadisticas());
  } catch (err) {
    next(err);
  }
};
// Hacerlo sin corchetes puede provocar un riesgo, ya que esta función va a devolver la respuesta de la petición.

const listarResenias = async (req, res, next) => {
  try {
    const peliculaId = Number(req.params.id);
    const pelicula = await db.obtenerPorId(peliculaId);

    const resenias = await db.obtenerResenas(peliculaId);
    res.json({ pelicula: pelicula.titulo, resenias });
  } catch (err) {
    next(err);
  }
};
const crearResenias = async (req, res, next) => {
  try {
    const peliculaId = Number(req.params.id);
    const pelicula = await db.obtenerPorId(peliculaId);
    const { autor, texto, puntuacion } = req.body;
    if (puntuacion < 1 || puntuacion > 10)
      return res
        .status(400)
        .json({ error: "La puntuación debe estar del 0 al 10" });
    const nueva = await db.crearResena(peliculaId, {
      autor,
      texto,
      puntuacion: Number(puntuacion),
    });
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarPeliculas,
  obtenerPeliculas,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
  obtenerEstadisticas,
  listarResenias,
  crearResenias,
};
