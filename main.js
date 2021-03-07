const METAS = {
  "A": 5,
  "B": 10,
  "C": 15,
  "Cuauh": 20
};

const INPUT = {
  "jugadores" : [  
     {  
        "nombre":"Juan Perez",
        "nivel":"C",
        "goles":10,
        "sueldo":50000,
        "bono":25000,
        "sueldo_completo":null,
        "equipo":"rojo"
     },
     {  
        "nombre":"EL Cuauh",
        "nivel":"Cuauh",
        "goles":30,
        "sueldo":100000,
        "bono":30000,
        "sueldo_completo":null,
        "equipo":"azul"
     },
     {  
        "nombre":"Cosme Fulanito",
        "nivel":"A",
        "goles":7,
        "sueldo":20000,
        "bono":10000,
        "sueldo_completo":null,
        "equipo":"azul"

     },
     {  
        "nombre":"El Rulo",
        "nivel":"B",
        "goles":9,
        "sueldo":30000,
        "bono":15000,
        "sueldo_completo":null,
        "equipo":"rojo"
     }
  ]
};

const obtenerGolesEquipos = jugadores =>
  jugadores.reduce((equipos, jugador) => ({
    ...equipos,
    [jugador.equipo]: (equipos[jugador.equipo] || 0) + jugador.goles
  }), {});

function calcularSueldos({jugadores}) {
  const golesEquipos = obtenerGolesEquipos(jugadores);
  console.log("golesEquipos", golesEquipos);
}

calcularSueldos(INPUT);