const METAS = {
  "A": 5,
  "B": 10,
  "C": 15,
  "Cuauh": 20
};

const FACTOR_BONO_INDIVIDUAL = 0.5;

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

const calcularFactorBono = (goles, meta) => goles > meta ? 1 : goles / meta;

const obtenerStatsEquipos = jugadores =>
  jugadores.reduce((stats, jugador) => {
    const updatedStats = {
      ...stats,
      [jugador.equipo]: {
        goles: ((stats[jugador.equipo] && stats[jugador.equipo].goles) || 0) + jugador.goles,
        meta: ((stats[jugador.equipo] && stats[jugador.equipo].meta) || 0) + METAS[jugador.nivel]
      }
    };
    updatedStats[jugador.equipo].factorBono = calcularFactorBono(updatedStats[jugador.equipo].goles, updatedStats[jugador.equipo].meta);
    return updatedStats;
  }, {});

const obtenerSueldosJugadores = (jugadores, stats) =>
  jugadores.map(jugador => ({
    ...jugador,
    sueldo_completo:
      jugador.sueldo +
      (jugador.bono * calcularFactorBono(jugador.goles, METAS[jugador.nivel]) * FACTOR_BONO_INDIVIDUAL) +
      (jugador.bono * stats[jugador.equipo].factorBono * (1 - FACTOR_BONO_INDIVIDUAL))
  }));

function calcularSueldos({jugadores}) {
  const statsEquipos = obtenerStatsEquipos(jugadores);
  console.log("statsEquipos", statsEquipos);
  return obtenerSueldosJugadores(jugadores, statsEquipos);
}

module.exports = {
  calcularSueldos
};