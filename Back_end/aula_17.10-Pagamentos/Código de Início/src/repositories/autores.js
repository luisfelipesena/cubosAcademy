const database = require('../utils/database');
const { encrypt } = require('../utils/password');

const adicionarAutor = async (autor) => {
	const { nome, sobrenome, email, senha, saldo = 0 } = autor;
	const query = {
		text: `INSERT INTO autores (
			nome,
			sobrenome,
			email,
			senha,
			saldo
		) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
		values: [nome, sobrenome, email, senha, saldo],
	};
	const result = await database.query(query);

	return result.rows.shift();
};

const deletarAutor = async (id, estado) => {
	if (!estado) {
		return null;
	}

	const query = `UPDATE autores SET deletado = $1 WHERE id = $2 RETURNING *`;
	const result = await database.query({
		text: query,
		values: [estado, id],
	});

	return result.rows.shift();
};

const atualizarAutor = async (autor) => {
	const { id, nome, sobrenome, email, senha, saldo = 0 } = autor;
	const query = {
		text: `UPDATE autores SET nome = $1,
		sobrenome = $2,
		email = $3,
		senha = $4,
		saldo = $5 WHERE id = $6
		RETURNING *`,
		values: [nome, sobrenome, email, senha, saldo, id],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const obterAutor = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM autores WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const obterAutorPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = `SELECT * FROM autores WHERE email = $1 AND deletado = false`;
	const result = await database.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
};

const obterAutores = async (deletado = false) => {
	const query = `SELECT * FROM autores WHERE deletado = $1;`;
	const result = await database.query({
		text: query,
		values: [deletado],
	});

	return result.rows;
};

const salvarCartao = async (autor = null, transacao = null) => {
	if (!autor || !transacao) {
		return null;
	}

	const { id, nome } = autor;
	const { last_digits, first_digits, brand } = transacao.card;

	const query = `INSERT INTO credit_cards (
		autor_id,
		first_digits,
		last_digits,
		card_hash,
		brand,
		holder_name
	) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

	const result = await database.query({
		text: query,
		values: [id, first_digits, last_digits, transacao.card.id, brand, nome],
	});

	return result.rows.shift();
};

const salvarTransacao = async (transacao = null) => {
	if (!transacao) {
		return null;
	}

	const { id } = transacao;

	const query = `INSERT INTO transactions (
		id
	) VALUES ($1) RETURNING *`;

	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

module.exports = {
	adicionarAutor,
	obterAutor,
	obterAutores,
	deletarAutor,
	atualizarAutor,
	obterAutorPorEmail,
	salvarCartao,
	salvarTransacao,
};
