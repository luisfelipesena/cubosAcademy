import React from "react";
import "./App.css";

const formatarData = (dataString) => {
  const [dia = null, mes = null, ano = null] = dataString.split("/");
  if (
    !dia ||
    !mes ||
    !ano ||
    Number(mes) > 12 ||
    Number(mes) < 1 ||
    Number(dia) < 1 ||
    Number(dia) > 31
  ) {
    return new Date(NaN);
  }
  return new Date(ano, mes - 1, dia);
};

function dataEhValida(data) {
  return !Number.isNaN(data.valueOf());
}

function erroPosterior(partida, retorno) {
  if (
    !dataEhValida(formatarData(partida)) ||
    !dataEhValida(formatarData(retorno))
  ) {
    return true;
  } else {
    if (+formatarData(partida) > +formatarData(retorno)) {
      return false;
    } else {
      return true;
    }
  }
}

function App() {
  const [partida, mudarPartida] = React.useState("");
  const [retorno, mudarRetorno] = React.useState("");

  return (
    <div className="AppMain">
      <div className="App">
        <label>
          <div>Partida</div>
          <input
            onInput={(ev) => {
              mudarPartida(ev.target.value);
            }}
          />
          <div
            className="invalida"
            hidden={partida === "" ? true : dataEhValida(formatarData(partida))}
          >
            Data inválida
          </div>
        </label>
        <label>
          <div>Retorno</div>
          <input
            onInput={(ev) => {
              mudarRetorno(ev.target.value);
            }}
          />
          <div
            className="invalida"
            hidden={retorno === "" ? true : dataEhValida(formatarData(retorno))}
          >
            Data inválida
          </div>
        </label>
      </div>
      <div
        className="erro"
        hidden={
          partida === "" || retorno === ""
            ? true
            : erroPosterior(partida, retorno)
        }
      >
        A data de partida é posterior à de retorno.
      </div>
    </div>
  );
}

export default App;
