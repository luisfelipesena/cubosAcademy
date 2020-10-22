import React from "react";
const {
  images,
  organizarSetas,
  ordenarSetas,
} = require("../functions/functions");

/**
 * Função que edita as rodadas, tornando possivel a modificação dos valores
 * Responsável pela dinâmica das imagens
 */
function EditarRodadas(props) {
  const {
    jogo,
    editarPlacar,
    setEditarPlacar,
    logado,
    setTabela,
    setJogosRodada,
    rodada,
    editarRodada,
    rodadasTabela,
  } = props;

  const [golsAEstado, setgolsA] = React.useState(jogo.gols_casa);
  const [golsBEstado, setgolsB] = React.useState(jogo.gols_visitante);

  let hidden = false;
  let imagem = images.caneta;

  if (editarPlacar.valor === "check" && editarPlacar.id === jogo.id) {
    imagem = images.check;

    return (
      <tr>
        <td>{jogo.time_casa} </td>
        <td>
          <input
            onChange={(ev) => setgolsA(Number(ev.target.value))}
            className="gols"
            value={golsAEstado}
          />
        </td>
        <td>x </td>
        <td>
          <input
            onChange={(ev) => setgolsB(Number(ev.target.value))}
            className="gols"
            value={golsBEstado}
          />
        </td>
        <td>{jogo.time_visitante}</td>
        <td>
          <button
            className="editar"
            onClick={() => {
              if (
                !isNaN(golsAEstado) &&
                !isNaN(golsBEstado) &&
                golsAEstado < 100 &&
                golsBEstado < 100
              ) {
                editarRodada(
                  jogo.id,
                  golsAEstado,
                  golsBEstado,
                  logado
                ).then(() => rodadasTabela(setTabela, setJogosRodada, rodada));
              }
              const newPlacar = { id: null, valor: "caneta" };
              setEditarPlacar(newPlacar);
            }}
            hidden={hidden}
          >
            <img src={imagem} alt="Editar/Confirmar"></img>
          </button>
        </td>
      </tr>
    );
  } else if (editarPlacar.valor === null) {
    hidden = true;
  } else {
    imagem = images.caneta;
  }
  return (
    <tr>
      <td>{jogo.time_casa}</td>
      <td className="gols">{jogo.gols_casa}</td>
      <td>x </td>
      <td className="gols">{jogo.gols_visitante}</td>
      <td>{jogo.time_visitante}</td>
      <td>
        <button
          className="editar"
          onClick={() => {
            const newPlacar = { id: jogo.id, valor: "check" };
            setEditarPlacar(newPlacar);
          }}
          hidden={hidden}
        >
          <img src={imagem} alt="Editar/Confirmar"></img>
        </button>
      </td>
    </tr>
  );
}

/**
 * Função que formata o html necessário para o funcionamento da tabela e acessa a função ordenarSetas
 * Caso o botão seja clicado, acessa-se o organizarSetas e muda-se o estado de Ordenação
 */
function formatarBotaoTabela(setOrdenacao, tabela, ordenacao, prop) {
  return (
    <button onClick={() => setOrdenacao(organizarSetas(ordenacao, prop))}>
      <img
        src={ordenarSetas(ordenacao, prop, tabela) || images.setaDupla}
        alt="Ordenação"
      ></img>
    </button>
  );
}

export { EditarRodadas, formatarBotaoTabela };
