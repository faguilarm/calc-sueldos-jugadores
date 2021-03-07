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

const obtenerStatsEquipos = jugadores =>
  jugadores.reduce((equipos, jugador) => ({
    ...equipos,
    [jugador.equipo]: {
      goles: ((equipos[jugador.equipo] && equipos[jugador.equipo].goles) || 0) + jugador.goles,
      meta: ((equipos[jugador.equipo] && equipos[jugador.equipo].meta) || 0) + METAS[jugador.nivel]
    }
  }), {});

const obtenerSueldosJugadores = (jugadores, stats) =>
  jugadores.map(jugador => ({
    ...jugador,
    sueldo_completo:
      jugador.sueldo +
      ((jugador.bono * (jugador.goles/METAS[jugador.nivel])) * 0.5) +
      ((jugador.bono * (stats[jugador.equipo].goles/stats[jugador.equipo].meta)) * 0.5)
  }));

function calcularSueldos({jugadores}) {
  const statsEquipos = obtenerStatsEquipos(jugadores);
  console.log("statsEquipos", statsEquipos);
  const sueldos = obtenerSueldosJugadores(jugadores, statsEquipos);
  console.log(sueldos);
}

calcularSueldos(INPUT);