const fs = require("fs");
const util = require("util");

const lerTabela = util.promisify(fs.readFile);
const escreverTabela = util.promisify(fs.writeFile);

let jogos = []; //guarda cada linha do arquivo brasileirao.txt, ou seja, cada jogo
let times = []; //guarda em cada objeto, um time e suas stats
/**
 * Função que inicia a leitura da tabela e a formata
 */
const formatandoTabela = async () => {
  const brasileiraoTxt = (await lerTabela("./brasileirao.txt")).toString();
  const jogosLinha = brasileiraoTxt.split("\n");
  for (const jogo of jogosLinha) {
    const formatacao = jogo.split("\t");
    const jogoFormatado = {
      time1: formatacao[0],
      gols1: Number(formatacao[1]),
      time2: formatacao[4].replace("\r", ""),
      gols2: Number(formatacao[3]),
    };
    jogos.push(jogoFormatado);
  }

  jogos.forEach((jogo) => {
    if (jogo.gols1 > jogo.gols2) {
      computarPontos(jogo.time1, 3, jogo.gols1, jogo.gols2, "v");
      computarPontos(jogo.time2, 0, jogo.gols2, jogo.gols1, "d");
    } else if (jogo.gols1 < jogo.gols2) {
      computarPontos(jogo.time1, 0, jogo.gols1, jogo.gols2, "d");
      computarPontos(jogo.time2, 3, jogo.gols2, jogo.gols1, "v");
    } else {
      computarPontos(jogo.time1, 1, jogo.gols1, jogo.gols2, "e");
      computarPontos(jogo.time2, 1, jogo.gols2, jogo.gols1, "e");
    }
  });
  /**
   * Funções Possíveis para serem utilizadas [escolher uma das ordenações]
   */
  ordenarTimes();
  ordenarAlfabeticamente();
  ordenarEmpates();
  ordenarGolsFeitos();
  ordenarGolsSofridos();

  escreverArquivo();
};
/**
 * Função que escreve em um arquivo tabela.txt
 */
async function escreverArquivo() {
  await escreverTabela("tabela.txt", JSON.stringify(times, null, 4));
  console.log("tabela.txt feita com sucesso");
}
/**
 * Função que computa os pontos de cada time
 */
function computarPontos(time, pontos, golsFeitos, golsSofridos, sigla) {
  for (let i = 0; i < times.length; i++) {
    if (times[i].nome == time) {
      times[i].jogos++;
      times[i].golsFeitos += golsFeitos;
      times[i].golsSofridos += golsSofridos;
      times[i].saldo = times[i].golsFeitos - times[i].golsSofridos;
      times[i].pontos += pontos;
      if (sigla === "v") {
        times[i].vitorias++;
      } else if (sigla === "d") {
        times[i].derrotas++;
      } else {
        times[i].empates++;
      }

      return;
    }
  }

  times.push({
    nome: time,
    jogos: 1,
    pontos: pontos,
    vitorias: sigla === "v" ? 1 : 0,
    derrotas: sigla === "d" ? 1 : 0,
    empates: sigla === "e" ? 1 : 0,
    golsFeitos: golsFeitos,
    golsSofridos: golsSofridos,
    saldo: golsFeitos - golsSofridos,
  });
}
/**
 * Função de ordena corretamente os times no Brasileirão
 */
function ordenarTimes() {
  times.sort((a, b) => {
    if (a.pontos > b.pontos) {
      return -1;
    } else if (a.pontos < b.pontos) {
      return 1;
    } else {
      if (a.vitorias > b.vitorias) {
        return -1;
      } else if (a.vitorias < b.vitorias) {
        return 1;
      } else {
        if (a.saldo > b.saldo) {
          return -1;
        } else if (a.saldo < b.saldo) {
          return 1;
        } else {
          if (a.golsFeitos > b.golsFeitos) {
            return -1;
          } else if (a.golsFeitos < b.golsFeitos) {
            return 1;
          } else {
            a.nome.localeCompare(b.nome);
          }
        }
      }
    }
  });
}
/**
 * Função que ordena apenas alfabeticamente a tabela
 */
function ordenarAlfabeticamente() {
  times.sort((a, b) => a.nome.localeCompare(b.nome));
}
/**
 * Função que ordena por número de empates
 */
function ordenarEmpates() {
  times.sort((a, b) => b.empates - a.empates);
}
/**
 * Função que ordena por número de gols feitos
 */
function ordenarGolsFeitos() {
  times.sort((a, b) => b.golsFeitos - a.golsFeitos);
}
/**
 * Função que ordena por número de gols sofridos
 */
function ordenarGolsSofridos() {
  times.sort((a, b) => b.golsSofridos - a.golsSofridos);
}

formatandoTabela();
