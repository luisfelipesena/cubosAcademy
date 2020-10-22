const db = require('../utils/database');
const { formatarTabela } = require('../utils/tabela');

const obterUser = async (email) => {
	const query = `SELECT * FROM users
			WHERE email=$1`;
	const result = await db.query({
		text: query,
		values: [email],
	});
	return result.rows.shift();
};

/**
 * 1: obtem os jogos do banco de dados
 * 2: obtem o id dos times e suas respectivas logos do banco de dados
 * 3: formata a tabela com jogos e "images" - (une as informações das duas)
 * 4: retorna pro ctx.body os times == tabela já ordenada
 */
const obterTabela = async () => {
	const jogos = await obterJogos();
	const images = await obterTimes();
	const times = await formatarTabela(jogos, images);
	return times;
};

const obterTimes = async () => {
	const query = `SELECT * FROM times`;
	const result = await db.query(query);
	return result.rows;
};

const obterJogos = async () => {
	const query = `SELECT * FROM jogos`;
	const result = await db.query(query);
	return result.rows;
};

const obterJogosRodada = async (rodada) => {
	const query = `SELECT * FROM jogos
			WHERE rodada= $1
			ORDER BY id asc`;
	const result = await db.query({
		text: query,
		values: [rodada],
	});
	return result.rows;
};

const editarPlacar = async (id, golsCasa, golsVisitante) => {
	const query = `UPDATE jogos
			SET gols_casa=$1 , gols_visitante=$2
			WHERE id=$3 RETURNING *`;
	const result = await db.query({
		text: query,
		values: [golsCasa, golsVisitante, id],
	});
	return result.rows;
};

module.exports = {
	obterJogos,
	obterTimes,
	obterTabela,
	obterJogosRodada,
	obterUser,
	editarPlacar,
};
