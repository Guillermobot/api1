import express from 'express';
import getroutes from './getroutes.js';
import cors from 'cors';



const app = express();
const PORT = 3000;

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Habilitar el análisis de JSON en las solicitudes

app.use("/api/pokemon", getroutes); // Usar las rutas definidas en getroutes.js

app.listen(PORT, () => {
    console.log(`Api Pokemon corriendo en http://0.0.0.0:${PORT}`);

});