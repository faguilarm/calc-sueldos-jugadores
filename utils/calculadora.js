const METAS = {
  "A": 5,
  "B": 10,
  "C": 15,
  "Cuauh": 20
};

const FACTOR_BONO_INDIVIDUAL = 0.5;

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
  return obtenerSueldosJugadores(jugadores, statsEquipos);
}

module.exports = {
  calcularSueldos
};