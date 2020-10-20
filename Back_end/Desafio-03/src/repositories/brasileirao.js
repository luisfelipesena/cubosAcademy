const db = require('../utils/database');

const obterUser = async (email) => {
	const query = `SELECT * FROM users
			WHERE email=$1`;
	const result = await db.query({
		text: query,
		values: [email],
	});
	return result.rows.shift();
};

const obterTabela = async () => {
	const query = `SELECT * FROM tabela AS ta
		INNER JOIN times as t on t.time = ta.time
		ORDER BY ta.pontos desc, ta.vitorias desc, ta.saldo_de_gols desc, ta.gols_feitos desc, ta.time desc`;
	const result = await db.query(query);
	return result.rows;
};

const inserirNaTabela = async (tabela) => {
	// Caso haja uma atualização previne dados repetidos
	const query = `DELETE FROM tabela`;
	await db.query({ text: query });
	let result;
	for (const time of tabela) {
		const query = `INSERT INTO tabela
			(time,jogos,pontos,empates,vitorias,derrotas,gols_feitos,gols_sofridos,saldo_de_gols)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
		result = await db.query({
			text: query,
			values: [
				time.nome,
				time.jogos,
				time.pontos,
				time.empates,
				time.vitorias,
				time.derrotas,
				time.golsFeitos,
				time.golsSofridos,
				time.saldo,
			],
		});
	}
	return result;
};

const obterJogos = async () => {
	const query = `SELECT * FROM jogos`;
	const result = await db.query(query);
	return result.rows;
};

const obterJogosRodada = async (rodada) => {
	const query = `SELECT * FROM jogos
			WHERE rodada= $1`;
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
	inserirNaTabela,
	obterTabela,
	obterJogosRodada,
	obterUser,
	editarPlacar,
};
