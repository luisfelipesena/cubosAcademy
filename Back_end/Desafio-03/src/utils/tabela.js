const Brasileirao = require('../repositories/brasileirao');

let times = [];

/**
 * Função que já formata a tabela baseada no banco de dados dos jogos;
 * Primeiro: zera o array times para evidar duplicações
 * Segundo: mapeia os jogosDb e vai computando os pontos de cada time;
 * Terceiro: ordena os times na tabela e insere na table tabela as informações por time;
 */

const formatarTabela = async () => {
	times = [];
	const jogosDb = await Brasileirao.obterJogos();
	jogosDb.forEach((jogo) => {
		if (jogo.gols_casa > jogo.gols_visitante) {
			computarPontos(jogo.time_casa, 3, jogo.gols_casa, jogo.gols_visitante, 'v');
			computarPontos(jogo.time_visitante, 0, jogo.gols_visitante, jogo.gols_casa, 'd');
		} else if (jogo.gols_casa < jogo.gols_visitante) {
			computarPontos(jogo.time_casa, 0, jogo.gols_casa, jogo.gols_visitante, 'd');
			computarPontos(jogo.time_visitante, 3, jogo.gols_visitante, jogo.gols_casa, 'v');
		} else {
			computarPontos(jogo.time_casa, 1, jogo.gols_casa, jogo.gols_visitante, 'e');
			computarPontos(jogo.time_visitante, 1, jogo.gols_visitante, jogo.gols_casa, 'e');
		}
	});

	await Brasileirao.inserirNaTabela(times);
	console.log('Tabela Formatada');
};

/**
 * Função que computa a pontuação de cada time e adiciona no array de times;
 * Siglas: "v" - vitória; "e" - empate; "d" - derrota;
 */

function computarPontos(time, pontos, golsFeitos, golsSofridos, sigla) {
	for (let i = 0; i < times.length; i++) {
		if (times[i].nome == time) {
			times[i].jogos++;
			times[i].golsFeitos += golsFeitos;
			times[i].golsSofridos += golsSofridos;
			times[i].saldo = times[i].golsFeitos - times[i].golsSofridos;
			times[i].pontos += pontos;
			if (sigla === 'v') {
				times[i].vitorias++;
			} else if (sigla === 'd') {
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
		vitorias: sigla === 'v' ? 1 : 0,
		derrotas: sigla === 'd' ? 1 : 0,
		empates: sigla === 'e' ? 1 : 0,
		golsFeitos: golsFeitos,
		golsSofridos: golsSofridos,
		saldo: golsFeitos - golsSofridos,
	});
}

/**
 * Exporta a função formatarTabela para schema.js e a variável jogos que contem jogo a jogo formatado
 */
module.exports = { formatarTabela };
