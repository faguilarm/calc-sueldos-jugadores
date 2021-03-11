const { validarObj } = require("./validadorJson");

const ESQUEMA_SIMPLE = {
  "jugadores": {
    "type": "array",
    "of": { "nombre":"string", "nivel":"string", "goles":"number", "sueldo":"number", "bono":"number", "equipo":"string" }
  }
};

const ESQUEMA_EQUIPOS = {
  "equipos": {
    "type": "array",
    "of": {
      "nombre": "string",
      "metas": {
        "type": "object",
        "of": { "A":"number", "B":"number", "C":"number", "Cuauh":"number" }
      },
      "jugadores": {
        "type": "array",
        "of": { "nombre":"string", "nivel":"string", "goles":"number", "sueldo":"number", "bono":"number" }
      }
    }
  }
};

const METAS_DEFAULT = {
  "A": 5,
  "B": 10,
  "C": 15,
  "Cuauh": 20
};

const FACTOR_BONO_INDIVIDUAL = 0.5;

const calcularFactorBono = ({goles, meta}) => goles > meta ? 1 : goles / meta;

const truncarMonto = monto => Math.trunc(monto * 100) / 100;

const obtenerSueldoJugador = (jugador, factorBonoEquipo, metas) => ({
  ...jugador,
  sueldo_completo:
    truncarMonto(
      jugador.sueldo +
      (jugador.bono * calcularFactorBono({goles: jugador.goles, meta: metas[jugador.nivel]}) * FACTOR_BONO_INDIVIDUAL) +
      (jugador.bono * factorBonoEquipo * (1 - FACTOR_BONO_INDIVIDUAL))
    )
});

const obtenerSueldosSimple = ({jugadores}) => {
  const jugadoresAgrupados = jugadores.reduce((equipos, jugador) => ({
    ...equipos,
    [jugador.equipo]: [...(equipos[jugador.equipo] || []), jugador]
  }), {});
  //console.log("jugadores agrupados en equipos", jugadoresAgrupados);
  const statsEquipos =
    Object.entries(jugadoresAgrupados)
      .reduce((equipos, [equipo, jugadores]) => ({
        ...equipos,
        [equipo]: calcularFactorBono(obtenerStatsEquipo(jugadores))
      }), {});
  //console.log("statsEquipos", statsEquipos);
  return {
    jugadores: jugadores.map(jugador => obtenerSueldoJugador(jugador, statsEquipos[jugador.equipo], METAS_DEFAULT))
  };
};

const obtenerStatsEquipo = (jugadores, metas) =>
  jugadores.reduce((stats, jugador) => ({
    goles: (stats.goles || 0) + jugador.goles,
    meta: (stats.meta || 0) + metas[jugador.nivel]
  }), {});

const obtenerSueldosEquipos = ({equipos}) => ({
  equipos: equipos.map(({nombre, metas, jugadores}) => {
    console.log(nombre,metas);
    const factorBonoEquipo = calcularFactorBono(obtenerStatsEquipo(jugadores, metas));
    //console.log("factorBonoEquipo", nombre, factorBonoEquipo);
    return {
      nombre,
      jugadores: jugadores.map(jugador => obtenerSueldoJugador(jugador, factorBonoEquipo, metas))
    };
  })
});

function calcularSueldos(datos) {
  if(validarObj(datos, ESQUEMA_SIMPLE)) {
    return obtenerSueldosSimple(datos);
  } else if(validarObj(datos, ESQUEMA_EQUIPOS)) {
    return obtenerSueldosEquipos(datos);
  }
  return "ESTRUCTURA INVÁLIDA";
}

module.exports = {
  calcularSueldos
};