import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

//informacion del pokemon especifico
router.get('/pokemon/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  if (!response.ok) return res.status(404).json({ error: "Pokémon no encontrado" });

  const data = await response.json();

  res.json({
    nombre: data.name,
    tipo: data.types.map(t => t.type.name),
    altura: data.height,
    peso: data.weight,
    sprite: data.sprites.front_default
  });
});

//informacion de los tipos
router.get('/tipos', async (req, res) => {
    const response = await fetch('https://pokeapi.co/api/v2/type/');
    if (!response.ok) return res.status(404).json({ error: "No se pudieron obtener los tipos" });
  
    const data = await response.json();
  
    res.json({
      tipos: data.results.map(t => t.name),
    });
  });


  //lista de pokemones con paginacion
  router.get('/pokemones', async (req, res) => {
    const { limit = 10, offset = 0 } = req.query; // Por defecto 10 por página
  
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) return res.status(404).json({ error: "No se pudieron obtener los Pokémon" });
  
    const data = await response.json();
  
    res.json({
      pokemones: data.results,
      siguiente: data.next,
      anterior: data.previous
    });
  });
  
  

export default router;
