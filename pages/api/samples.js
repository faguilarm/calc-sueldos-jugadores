const simple = require("../../utils/samples/simple.json");
const equipos = require("../../utils/samples/equipos.json");

export default (req, res) => {
  res.status(200).json([
    { "label": "Ejemplo 1: Lista única de jugadores (metas por default)", "value": simple },
    { "label": "Ejemplo 2: Lista de equipos con metas personalizadas", "value": equipos }
  ]);
}