const express = require("express");
const router = express.Router();

let jugadores = [];
let idActualJugadores = 1;

// GET todos
router.get("/players", (req, res) => {
  res.json(jugadores);
});

// GET por ID
router.get("/players/:id", (req, res) => {
  const jugador = jugadores.find((j) => j.id === parseInt(req.params.id));
  if (!jugador) return res.status(404).send("Jugador no encontrado");
  res.json(jugador);
});

/* POST  Agregar un nuevo jugador directamente sin pasar por SQS
Estructura Ejemplo :
{
    "gamertag": "usuario134",
    "comentario": "buen juego, recomendado para fines de semana",
    "calificacion": 5
  }
*/
router.post("/players", (req, res) => {
  const nuevoJugador = req.body;
  if (
    !nuevoJugador.gamertag ||
    !nuevoJugador.comentario ||
    typeof nuevoJugador.calificacion !== "number"
  ) {
    return res.status(400).send("Faltan datos requeridos");
  }

  nuevoJugador.id = idActualJugadores++;
  jugadores.push(nuevoJugador);
  res.status(201).json(nuevoJugador);
});

// PUT - Actualizar un jugador existente por ID
router.put("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = jugadores.findIndex((j) => j.id === id);

  if (index === -1) return res.status(404).send("Jugador no encontrado");

  const actualizado = req.body;
  if (
    !actualizado.gamertag ||
    !actualizado.comentario ||
    typeof actualizado.calificacion !== "number"
  ) {
    return res.status(400).send("Faltan datos requeridos");
  }

  actualizado.id = id; // mantener el mismo id
  jugadores[index] = actualizado;

  res.json(actualizado);
});

// DELETE - Eliminar un jugador por ID
router.delete("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = jugadores.findIndex((j) => j.id === id);

  if (index === -1) return res.status(404).send("Jugador no encontrado");

  jugadores.splice(index, 1);
  res.sendStatus(204); // Sin contenido
});

// Agregamos métodos y datos al router directamente
router.jugadores = jugadores;
router.agregarJugador = function (nuevoJugador) {
  nuevoJugador.id = idActualJugadores++;
  jugadores.push(nuevoJugador);
};

module.exports = router;
