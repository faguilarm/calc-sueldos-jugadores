import React from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [samples, setSamples] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [jsonInput, setJsonInput] = React.useState("");
  const [jsonOutput, setJsonOutput] = React.useState("");

  React.useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    const req = await fetch("/api/samples");
    const data = await req.json();
    setSamples(data);
  };

  const fetchCalc = async () => {
    const req = await fetch("/api/calcular", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonInput
    });
    const data = await req.json();
    setJsonOutput(JSON.stringify(data, null, 2));
  };

  const handleSelect = (event) => {
    setSelected(event.target.value);
    setJsonInput(event.target.value? JSON.stringify(samples[event.target.value].value, null, 2) : "");
  };

  const handleClick = (event) => {
    try {
      JSON.parse(jsonInput);
      fetchCalc();
    } catch (error) {
      alert("No es un documento JSON válido");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Calculadora de Sueldos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div>
          <select value={selected} onChange={handleSelect}>
          <option value=""></option>
            {samples.map((sample, index) =>
              <option key={index} value={index}>{sample.label}</option>
            )}
          </select>
          <textarea
            value={jsonInput} placeholder="Ingresar JSON con los datos de entrada"
            onChange={event => setJsonInput(event.target.value)}>
          </textarea>
        </div>
        <button onClick={handleClick}>
          Calcular
        </button>
        <textarea value={jsonOutput} readOnly></textarea>
      </div>      
    </div>
  )
}
