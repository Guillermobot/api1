const express = require("express");
const rutas = require("./rutas");
const iniciarReceiver = require("./reciver");

const app = express();
const port = 4000;

app.use(express.json());
app.use("/2", rutas); // Usamos el router completo

app.listen(port, () => {
  console.log(`API de Horas de Juego corriendo en http://localhost:${port}`);
  iniciarReceiver();
});

// Exportamos funciones específicas del router para otros módulos
module.exports = rutas;
