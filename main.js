const fs = require('fs');
const { calcularSueldos } = require("./utils/calculadora");

let inputData = JSON.parse(fs.readFileSync(process.argv[2]));

console.log(JSON.stringify(calcularSueldos(inputData), null, 2));
