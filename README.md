# Prueba de Ingeniería Resuelve

## Introducción

Este proyecto contiene una solución a la prueba de ingeniería de Resuelve, disponible en: [https://github.com/resuelve/prueba-ing-backend](https://github.com/resuelve/prueba-ing-backend)

En las siguientes secciones se listan los aspectos más relevantes de esta solución así como la forma de ponerla en ejecución.


## Instalación

Estando en la raíz del repositorio, ejecutar:

```bash
npm install
# o
yarn install
```

## Ejecución

El proceso de cálculo de sueldos puede ser usado de dos formas: 
* Proyecto NextJS que consta de un API con dos métodos para obtener los archivos de prueba, así como para la ejecución del cálculo; adicionalmente, una interfaz web para utilizar los recursos anteriores.
* Script JS para su ejecución desde la línea de comandos.

#### Aplicación NextJS

Ejecutar el servidor de desarrollo mediante:

```bash
npm run dev
# o
yarn dev
```

Esto iniciará una instancia en [http://localhost:3000](http://localhost:3000), la cual contará con un selector para indicar la modalidad deseada, el campo de texto para colocar el JSON de entrada y el área de resultado.

#### Línea de comandos

Desde la raíz del proyecto, ejecutar:

```bash
node main /ruta/a/archivo/json
```

El proyecto cuenta con 3 archivos de ejemplos en `utils/samples/*.json`:
* `simple.json`: la modalidad estándar, con un conjunto limitado de jugadores de dos equipos.
* `simple_1000.json`: misma modalidad anterior pero con 1000 jugadores (datos creados en [Mockaroo](https://www.mockaroo.com/)).
* `equipos.json`: la opción extendida con listas de equipos distintas.

De esta forma, podemos ejecutar un ejemplo de la siguiente forma, redirigiendo la salida a un archivo json para poder conservar el resultado:
```bash
node main utils/samples/simple.json > salida.json
```


## Modalidades de cálculo disponibles

### Simple
La solución inicial pasa por procesar una lista única con N jugadores, donde cada jugador tiene un atributo que indica su equipo. El valor del equipo será usado para calcular el total de goles y metas correspondienes a ese equipo, para poder obtener los bonos individual y de equipo. Para esta opción, el mínimo de goles por nivel ya se encuentra definido, de la siguiente forma:
```
{
  "A": 5,
  "B": 10,
  "C": 15,
  "Cuauh": 20
}
```
Uno de los ejemplos proporcionados para este tipo de cálculo, es el siguiente:
```
{
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
}
```

### Equipos
Como extensión al formato anterior, también se puede recibir una lista de equipos, donde cada uno se compone de un nombre, metas y lista de jugadores. El objeto de metas recibido es el que se usará para determinar los bonos individuales y de equipo en cada caso.
 Ejemplo:


```
{
   "equipos" : [
      {
         "nombre": "Resuelve FC",
         "metas": {
            "A": 10,
            "B": 15,
            "C": 20,
            "Cuauh": 30
         },
         "jugadores" : [  
            {  
               "nombre":"Luis Perez",
               "nivel":"C",
               "goles":16,
               "sueldo":50000,
               "bono":25000,
               "sueldo_completo":null
            },
            {  
               "nombre":"EL Cuauh",
               "nivel":"Cuauh",
               "goles":32,
               "sueldo":100000,
               "bono":30000,
               "sueldo_completo":null
            },
            {  
               "nombre":"Cosme Fulanito",
               "nivel":"A",
               "goles":14,
               "sueldo":20000,
               "bono":10000,
               "sueldo_completo":null
            },
            {  
               "nombre":"El Rulo",
               "nivel":"B",
               "goles":10,
               "sueldo":30000,
               "bono":15000,
               "sueldo_completo":null
            }
         ]
      },
      {
         "nombre": "Banco Patito",
         "metas": {
            "A": 6,
            "B": 12,
            "C": 18,
            "Cuauh": 24
         },
         "jugadores" : [
            {
               "nombre":"Jorge Veloz",
               "nivel":"C",
               "goles":12,
               "sueldo":20000,
               "bono":10000,
               "sueldo_completo":null
            },
            {
               "nombre":"El champion",
               "nivel":"Cuauh",
               "goles":22,
               "sueldo":80000,
               "bono":20000,
               "sueldo_completo":null
            },
            {  
               "nombre":"Jose Feliciano",
               "nivel":"A",
               "goles":5,
               "sueldo":10000,
               "bono":10000,
               "sueldo_completo":null
            },
            {  
               "nombre":"Nelson JR",
               "nivel":"B",
               "goles":16,
               "sueldo":15000,
               "bono":10000,
               "sueldo_completo":null
            }
         ]
      }
   ]
}
```
## Comentarios adicionales

A continuación se listan algunas asunciones hechas sobre el problema, así como decisiones de tipo técnico que pueden servir como apoyo para analizar la solución propuesta.
* Uno de los puntos poco claros en la definición del problema, es el uso del atributo "equipo". Ningún otro campo dentro de la lista es opcional o queda sin ser utilizado, por lo que el **equipo** debería ser parte de la solución, como un indicador para llevar correctamente la segmentación. En la modalidad de cálculo con lista de equipos, sí lo volvería innecesario, ya que la pertenencia viene definida por la lista principal.
* También sobre el planteamiento del problema, el ejemplo de resultados del final no parece cuadrar de acuerdo a las reglas establecidas, así que realicé la solución más apegado a dichas reglas y sin tomar en cuenta los datos usados como muestra de la respuesta requerida.
* Si bien es permitido que los goles excedentes de los jugadores sean tomados en cuenta para la meta global del equipo, sí están topadas al 100% (factor 1) para el cálculo del bono individual y del equipo, lo que impedirá asignar un sueldo mayor a la suma del sueldo fijo y el bono variable.
* El framework NextJS fue elegido para permitir una aplicación sencilla basada en convenciones (`pages` y `api`) que facilitara trabajar de forma más directa en la solución.
* El módulo `validadorJson` ubicado a la par de la calculadora, parte de la necesidad de evaluar la entrada recibida y de poder soportar dos estructuras distintas que modifican ligeramente el proceso. Inicialmente la herramienta elegida para esto fue **Joi**, sin embargo, no quería extender más las dependencias considerando la modalidad en línea de comandos. Por lo anterior, decidí hacer una implementación sencilla que me permitiera validar la estructura de las entradas basado en un esquema predefinido para cada caso soportado.
* Tanto en `calculadora` como en `validadorJson`, traté de dar una primera aproximación a la programación funcional, tema en el que estoy comenzando a capacitarme y es probable que en la intención de evitar *loops*, mutabilidad y estados globales, se haya reducido la claridad o legibilidad del código. Con una mejor comprensión, uso de librerías o incluso un lenguaje más especializado en este paradigma, posiblemente hubiera expresado de forma más sencilla algunos procesos y composición de funciones.
