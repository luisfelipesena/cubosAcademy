import React from "react";
import "./App.css";

function dataEhValida(data) {
  const barras = data.toString().split("/");
  const formatado = `${barras[2]}/${barras[1]}/${barras[0]}`;
  if (barras[2] !== undefined && barras[2][0] !== undefined) {
    return !Number.isNaN(new Date(formatado).valueOf()) && barras[2][0];
  }
  return false;
}

function dataPartidaRetorno(partida, retorno) {
  const barrasPartida = partida.toString().split("/");
  const formatadoPartida = `${barrasPartida[2]}/${barrasPartida[1]}/${barrasPartida[0]}`;
  const barrasRetorno = retorno.toString().split("/");
  const formatadoRetorno = `${barrasRetorno[2]}/${barrasRetorno[1]}/${barrasRetorno[0]}`;
  if (!dataEhValida(partida) || !dataEhValida(retorno)) {
    return true;
  } else if (+new Date(formatadoPartida) > +new Date(formatadoRetorno)) {
    return false;
  } else {
    return true;
  }
}

function App() {
  const [partida, mudarPartida] = React.useState({
    valor: "",
    esconder: true,
  });
  const [retorno, mudarRetorno] = React.useState({
    valor: "",
    esconder: true,
  });

  return (
    <div className="AppMain">
      <div className="App">
        <label>
          <div>Partida</div>
          <input
            onInput={(ev) => {
              mudarPartida({
                ...partida,
                valor: ev.target.value,
              });
            }}
          />
          {!dataEhValida(partida.valor) && partida.valor !== "" ? (
            <div className="invalida">Data inválida</div>
          ) : (
            ""
          )}
        </label>
        <label>
          <div>Retorno</div>
          <input
            onInput={(ev) => {
              mudarRetorno({
                ...retorno,
                valor: ev.target.value,
              });
            }}
          />
          {!dataEhValida(retorno.valor) && retorno.valor !== "" ? (
            <div className="invalida">Data inválida</div>
          ) : (
            ""
          )}
        </label>
      </div>
      <div className="erro">
        {dataPartidaRetorno(partida.valor, retorno.valor)
          ? ""
          : "A data de partida é posterior à de retorno."}
      </div>
    </div>
  );
}

export default App;
