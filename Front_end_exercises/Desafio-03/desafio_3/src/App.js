import React from "react";
import "./App.css";

const images = {
  setaEsquerda: "https://systemuicons.com/images/icons/arrow_left.svg",
  setaDireita: "https://systemuicons.com/images/icons/arrow_right.svg",
  setaBaixo: "https://systemuicons.com/images/icons/arrow_down.svg",
  setaCima: "https://systemuicons.com/images/icons/arrow_up.svg",
  setaDupla: "https://systemuicons.com/images/icons/sort.svg",
  check: "https://systemuicons.com/images/icons/check.svg",
  caneta: "https://systemuicons.com/images/icons/pen.svg",
};

function App() {
  const [ordenacao, setOrdenacao] = React.useState({
    propriedade: "",
    valor: "",
  });

  const [email, setEmail] = React.useState(null);
  const [senha, setSenha] = React.useState(null);
  const [submit, setSubmit] = React.useState(false); // Estado que chama a função async de autenticar
  const [logado, setLogado] = React.useState(false); // Guarda o Token

  const [rodada, setRodada] = React.useState(1);
  const [jogosRodada, setJogosRodada] = React.useState([]);

  const [rodadaEditada, setRodadaEditada] = React.useState({
    id: null,
    golsCasa: null,
    golsVisitante: null,
  });

  const [tabela, setTabela] = React.useState([]);
  const [editarPlacar, setEditarPlacar] = React.useState({
    valor: null,
    id: null,
  });

  React.useEffect(() => {
    autenticar(email, senha).then((res) => {
      if (res !== false) {
        setLogado(res);
        const newPlacar = { ...editarPlacar, valor: "caneta" };
        setEditarPlacar(newPlacar);
      } else {
        setLogado(false);
      }
    });
  }, [submit]);

  React.useEffect(() => {
    setJogosRodada(null);
    obterRodada(rodada)
      .then((respJson) => {
        setJogosRodada(respJson.dados);
      })
      .then(() => {
        let tempTabela = [];
        obterTabela().then((respJson) => {
          respJson.dados.forEach((time, i) => {
            tempTabela.push({ ...time, posicao: i + 1 });
          });
          setTabela(tempTabela);
        });
      });
  }, [rodada, rodadaEditada]);

  return (
    <div className="App">
      <div className="header">
        <div className="conteudo">
          <a href="app.js" title="Menu Principal">
            <h1>Brasileirão</h1>
          </a>
          <div className="direita">
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              {!logado && (
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    onInput={(ev) => setEmail(ev.target.value)}
                  />
                </label>
              )}
              {!logado && (
                <label>
                  <span>Senha</span>
                  <input
                    type="password"
                    onInput={(ev) => setSenha(ev.target.value)}
                  />
                </label>
              )}

              <button
                onClick={(ev) => {
                  if (ev.target.innerText === "Deslogar") {
                    setLogado(false);
                    const newPlacar = { ...editarPlacar, valor: null };
                    setEditarPlacar(newPlacar);
                    return;
                  }
                  submit ? setSubmit(false) : setSubmit(true);
                }}
              >
                {logado ? "Deslogar" : "Logar"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="colunas">
        <div className="centro">
          <div className="jogos">
            <div className="cabecalho">
              <button
                title="Anterior"
                onClick={(ev) => {
                  rodada === 1 ? (ev.disabled = true) : setRodada(rodada - 1);
                }}
              >
                <img src={images.setaEsquerda} alt="seta esquerda"></img>
              </button>

              <h2>
                <span className="rodada">{rodada}ª</span> rodada
              </h2>

              <button
                title="Próxima"
                onClick={(ev) => {
                  rodada === 38 ? (ev.disabled = true) : setRodada(rodada + 1);
                }}
              >
                <img src={images.setaDireita} alt="seta direita"></img>
              </button>
            </div>

            <div className="jogosRodada">
              <table>
                <tfoot>
                  {jogosRodada === null ? (
                    <tr>
                      <td className="carregando">Carregando ...</td>
                    </tr>
                  ) : (
                    jogosRodada.map((jogo) =>
                      editarRodadas(
                        jogo.id,
                        jogo.time_casa,
                        jogo.gols_casa,
                        jogo.time_visitante,
                        jogo.gols_visitante,
                        editarPlacar,
                        setEditarPlacar,
                        setRodadaEditada,
                        logado
                      )
                    )
                  )}
                </tfoot>
              </table>
            </div>
          </div>

          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>
                    <span className="posicao">Posição</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "posicao"
                    )}
                  </th>
                  <th className="time">
                    <span className="time">Time</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "time"
                    )}
                  </th>
                  <th>
                    <span>PTS</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "pontos"
                    )}
                  </th>
                  <th>
                    <span>E</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "empates"
                    )}
                  </th>
                  <th>
                    <span>V</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "vitorias"
                    )}
                  </th>
                  <th>
                    <span>D</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "derrotas"
                    )}
                  </th>
                  <th>
                    <span>GF</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "gols_feitos"
                    )}
                  </th>
                  <th>
                    <span>GS</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "gols_sofridos"
                    )}
                  </th>
                  <th>
                    <span>SG</span>
                    {formatarBotaoTabela(
                      setOrdenacao,
                      tabela,
                      ordenacao,
                      "saldo_de_gols"
                    )}
                  </th>
                </tr>
              </thead>

              <tbody>
                {tabela.length === 0 ? (
                  <tr>
                    <td className="carregando">Carregando...</td>
                  </tr>
                ) : (
                  tabela.map((time) => (
                    <tr key={time.id}>
                      <td
                        className={
                          time.posicao <= 4
                            ? "libertadores"
                            : time.posicao >= 17
                            ? "rebaixamento"
                            : time.posicao > 4 && time.posicao <= 6
                            ? "prelibertadores"
                            : time.posicao > 6 && time.posicao <= 12
                            ? "americana"
                            : "permanece"
                        }
                      >
                        <img
                          className="icones"
                          src={time.link_imagem}
                          alt={time.time}
                        ></img>
                        {time.posicao}
                      </td>
                      <td>{time.time}</td>
                      <td>{time.pontos}</td>
                      <td>{time.empates}</td>
                      <td>{time.vitorias}</td>
                      <td>{time.derrotas}</td>
                      <td>{time.gols_feitos}</td>
                      <td>{time.gols_sofridos}</td>
                      <td>{time.saldo_de_gols}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Função que obtém a tabela de times do Back-end
 */
async function obterTabela() {
  const result = await fazerRequisicaoComBody(
    "http://localhost:8081/classificacao",
    "GET"
  );
  return result.json();
}

/**
 * Função que obtém os jogos da rodada do Back-end
 */
async function obterRodada(rodada) {
  const result = await fazerRequisicaoComBody(
    `http://localhost:8081/jogos/${rodada}`,
    "GET"
  );
  return result.json();
}

/**
 * Função que edita os jogos de uma rodada no banco de dados
 */
async function editarRodada(id, golsCasa, golsVisitante, token) {
  const result = await fazerRequisicaoComBody(
    `http://localhost:8081/jogos`,
    "POST",
    {
      id,
      golsCasa,
      golsVisitante,
    },
    token
  );
  console.log(await result.json());
}

/**
 * Função que obtém os jogos da rodada do Back-end
 */
async function autenticar(email = null, password = null) {
  if (!email || !password) {
    return false;
  }

  const objetoJson = {
    email,
    password,
  };

  const result = await fazerRequisicaoComBody(
    `http://localhost:8081/auth`,
    "POST",
    objetoJson
  );

  const dados = await result.json();
  if (dados.dados.token) {
    return dados.dados.token;
  } else {
    return false;
  }
}

/**
 * Função que formata o html necessário para o funcionamento da tabela
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

/**
 * Função que analisa o estado de ordenação para caso seja igual a propriedade (posição, time ...), retorne a imagem correspondente
 * e reorganiza a tabela baseada na ordenação e prop
 */
function ordenarSetas(ordenacao, prop, tabela) {
  if (ordenacao.propriedade === prop) {
    if (ordenacao.valor === "crescente") {
      const tempTabela = tabela;
      if (prop === "time") {
        tempTabela.sort((a, b) => a[prop].localeCompare(b[prop]));
      } else {
        tempTabela.sort((a, b) => a[prop] - b[prop]);
      }
      return images.setaCima;
    } else {
      const tempTabela = tabela;
      if (prop === "time") {
        tempTabela.sort((a, b) => b[prop].localeCompare(a[prop]));
      } else {
        tempTabela.sort((a, b) => b[prop] - a[prop]);
      }
      return images.setaBaixo;
    }
  }
  return false;
}

/**
 * Função que retorna um novo objeto com a propriedade valor modificada, consequentemente mudando a imagem das setas
 */
function organizarSetas(ordenacao, prop) {
  const { ...novoObj } = ordenacao;
  novoObj.propriedade = prop;
  novoObj.valor = novoObj.valor === "crescente" ? "decrescente" : "crescente";
  return novoObj;
}

/**
 * Função que edita as rodadas, tornando possivel a modificação dos valores
 * Responsável pela dinâmica das imagens
 */
function editarRodadas(
  id,
  timeA,
  golsA,
  timeB,
  golsB,
  editarPlacar,
  setEditarPlacar,
  setRodadaEditada,
  logado
) {
  let hidden = false;
  let imagem = images.caneta;
  let golsVisitante, golsCasa;
  if (editarPlacar.valor === null) {
    hidden = true;
  } else if (editarPlacar.valor === "check" && editarPlacar.id === id) {
    imagem = images.check;
    return (
      <tr key={id}>
        <td>{timeA} </td>
        <td>
          <input
            onInput={(ev) => (golsCasa = ev.target.value)}
            className="gols"
            placeholder={golsA}
          />
        </td>
        <td>x </td>
        <td>
          <input
            onInput={(ev) => (golsVisitante = ev.target.value)}
            className="gols"
            placeholder={golsB}
          />
        </td>
        <td>{timeB}</td>
        <td>
          <button
            className="editar"
            onClick={() => {
              editarRodada(id, golsCasa, golsVisitante, logado);
              const newPartida = { id, golsCasa, golsVisitante };
              setRodadaEditada(newPartida);

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
  } else {
    imagem = images.caneta;
  }

  return (
    <tr key={id}>
      <td>{timeA}</td>
      <td className="gols">{golsA}</td>
      <td>x </td>
      <td className="gols">{golsB}</td>
      <td>{timeB}</td>
      <td>
        <button
          className="editar"
          onClick={() => {
            const newPlacar = { id, valor: "check" };
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
 * Para fazer requisições POST, PUT, DELETE, etc
 */
function fazerRequisicaoComBody(url, metodo, conteudo, token = null) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}

export default App;
