import React from "react";
import "./App.css";
require("dotenv").config();

const images = {
  setaEsquerda: "https://systemuicons.com/images/icons/arrow_left.svg",
  setaDireita: "https://systemuicons.com/images/icons/arrow_right.svg",
  setaBaixo: "https://systemuicons.com/images/icons/arrow_down.svg",
  setaCima: "https://systemuicons.com/images/icons/arrow_up.svg",
  setaDupla: "https://systemuicons.com/images/icons/sort.svg",
  check: "https://systemuicons.com/images/icons/check.svg",
  caneta: "https://systemuicons.com/images/icons/pen.svg",
};

const linkLogos = {
  flamengo:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/04/10/Flamengo-2018.svg",
  internacional:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/internacional.svg",
  atleticoMg:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/10/atletico-mg.svg",
  saoPaulo:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/sao-paulo.svg",
  santos: "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/12/santos.svg",
  fluminense:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/fluminense.svg",
  fortaleza:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/06/10/optimised.svg",
  palmeiras:
    "https://s.glbimg.com/es/sde/f/organizacoes/2019/07/06/Palmeiras.svg",
  atleticoGo:
    "https://s.glbimg.com/es/sde/f/organizacoes/2020/07/02/atletico-go-2020.svg",
  gremio: "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/12/gremio.svg",
  sport: "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/sport.svg",
  ceara: "https://s.glbimg.com/es/sde/f/organizacoes/2019/10/10/ceara.svg",
  vasco: "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/vasco.svg",
  corinthians:
    "https://s.glbimg.com/es/sde/f/organizacoes/2019/09/30/Corinthians.svg",
  botafogo:
    "https://s.glbimg.com/es/sde/f/organizacoes/2019/02/04/botafogo-svg.svg",
  bahia: "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/bahia.svg",
  athleticoPr:
    "https://s.glbimg.com/es/sde/f/organizacoes/2019/09/09/Athletico-PR.svg",
  coritiba:
    "https://s.glbimg.com/es/sde/f/organizacoes/2018/03/11/coritiba.svg",
  bragantino: "https://s.glbimg.com/es/sde/f/organizacoes/2019/12/30/svg.svg",
  goias: "https://s.glbimg.com/es/sde/f/organizacoes/2019/05/01/Goias_SVG.svg",
};

function App() {
  // Ordenação guarda a propriedadade chamada: (Posição, Time, Pts, ...)
  // e também valor: ("crescente", "decrescente")
  const [ordenacao, setOrdenacao] = React.useState({
    propriedade: "",
    valor: "",
  });

  const [inputEmail, setEmail] = React.useState(null);
  const [inputSenha, setSenha] = React.useState(null);
  const [rodada, setRodada] = React.useState(1);
  const [editarPlacar, setEditarPlacar] = React.useState("caneta");

  React.useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="header">
        <div className="conteudo">
          <a href="app.js">
            <h1>Brasileirão</h1>
          </a>
          <div className="direita">
            <form onSubmit={(ev) => autenticar(ev, inputEmail, inputSenha)}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  onInput={(ev) => setEmail(ev.target.value)}
                />
              </label>
              <label>
                <span>Senha</span>
                <input
                  type="password"
                  onInput={(ev) => setSenha(ev.target.value)}
                />
              </label>
              <button>Logar</button>
            </form>
          </div>
        </div>
      </div>

      <div className="colunas">
        <div className="centro">
          <div className="jogos">
            <div className="cabecalho">
              <button
                onClick={() => {
                  rodada === 0 ? setRodada(0) : setRodada(rodada - 1);
                }}
              >
                <img src={images.setaEsquerda} alt="seta esquerda"></img>
              </button>

              <h2>
                <span className="rodada">{rodada}</span> rodada
              </h2>

              <button
                onClick={() => {
                  rodada === 38 ? setRodada(38) : setRodada(rodada + 1);
                }}
              >
                <img src={images.setaDireita} alt="seta direita"></img>
              </button>
            </div>

            <div className="jogosRodada">
              <ul>
                {editarRodadas(
                  "Gremio",
                  1,
                  "Santos",
                  2,
                  editarPlacar,
                  setEditarPlacar
                )}
              </ul>
            </div>
          </div>

          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>
                    <span className="posicao">Posição</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "posicao")}
                  </th>
                  <th className="time">
                    <span className="time">Time</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "time")}
                  </th>
                  <th>
                    <span>PTS</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "pontos")}
                  </th>
                  <th>
                    <span>E</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "empates")}
                  </th>
                  <th>
                    <span>V</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "vitorias")}
                  </th>
                  <th>
                    <span>D</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "derrotas")}
                  </th>
                  <th>
                    <span>GF</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "feitos")}
                  </th>
                  <th>
                    <span>GS</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "sofridos")}
                  </th>
                  <th>
                    <span>SG</span>
                    {formatarBotaoTabela(setOrdenacao, ordenacao, "saldo")}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="lugar">
                    <img
                      src={linkLogos.flamengo}
                      alt="flamengo"
                      className="icones"
                    ></img>
                    1
                  </td>
                  <td> Flamengo</td>
                  <td>89</td>
                  <td>5</td>
                  <td>28</td>
                  <td>5</td>
                  <td>85</td>
                  <td>37</td>
                  <td>39</td>
                </tr>
                <tr>
                  <td className="lugar">
                    <img
                      src={linkLogos.athleticoPr}
                      alt="flamengo"
                      className="icones"
                    ></img>
                    2
                  </td>
                  <td>Atletico</td>
                  <td>89</td>
                  <td>5</td>
                  <td>28</td>
                  <td>5</td>
                  <td>37</td>
                  <td>85</td>
                  <td>37</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

async function autenticar(ev = null, email, senha) {
  const result = await fazerRequisicaoComBody(
    "http://localhost:8081/classificacao",
    "GET"
  );
  alert(result);
}
autenticar();

/**
 * Função que formata o html necessário para o funcionamento da tabela
 */
function formatarBotaoTabela(setOrdenacao, ordenacao, prop) {
  return (
    <button onClick={() => setOrdenacao(organizarSetas(ordenacao, prop))}>
      <img
        src={ordenarSetas(ordenacao, prop) || images.setaDupla}
        alt="Ordenação"
      ></img>
    </button>
  );
}

/**
 * Função que analisa o estado de ordenação para caso seja igual a propriedade (posição, time ...), retorne a imagem correspondente
 */
function ordenarSetas(ordenacao, prop) {
  if (ordenacao.propriedade === prop) {
    if (ordenacao.valor === "crescente") {
      return images.setaCima;
    } else {
      return images.setaBaixo;
    }
  }
  return false;
}

/**
 * Função que retorna um novo objeto com a priedade valor modificada, consequentemente mudando a imagem das setas
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
  timeA,
  golsA,
  timeB,
  golsB,
  editarPlacar,
  setEditarPlacar
) {
  let hidden = false;
  let imagem = images.caneta;
  if (editarPlacar === null) {
    hidden = true;
  } else if (editarPlacar === "check") {
    imagem = images.check;
    return (
      <li>
        <div>
          <span>{timeA} </span>
          <input className="gols" placeholder={golsA}></input>
          <span>x </span>
          <input className="gols" placeholder={golsB}></input>
          <span>{timeB}</span>
        </div>
        <button
          onClick={() => {
            if (editarPlacar === "caneta") {
              setEditarPlacar("check");
            } else {
              setEditarPlacar(null);
            }
          }}
          hidden={hidden}
        >
          <img src={imagem} alt="Editar/Confirmar"></img>
        </button>
      </li>
    );
  } else {
    imagem = images.caneta;
  }

  return (
    <li>
      <div>
        <span>{timeA} </span>
        <span className="gols">{golsA} </span>
        <span>x </span>
        <span className="gols">{golsB} </span>
        <span>{timeB}</span>
      </div>
      <button
        onClick={() => {
          if (editarPlacar === "caneta") {
            setEditarPlacar("check");
          } else {
            setEditarPlacar(null);
          }
        }}
        hidden={hidden}
      >
        <img src={imagem} alt="Editar/Confirmar"></img>
      </button>
    </li>
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
