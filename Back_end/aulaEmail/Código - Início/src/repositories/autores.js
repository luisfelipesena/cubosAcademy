const database = require('../utils/database');

const adicionarAutor = async (autor) => {
	const { nome, sobrenome, email, senha } = autor;
	const query = {
		text: `INSERT INTO autores (
			nome,
			sobrenome,
			email,
			senha
		) VALUES ($1, $2, $3, $4) RETURNING *;`,
		values: [nome, sobrenome, email, senha],
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
	const { id, nome, sobrenome, email, senha } = autor;
	const query = {
		text: `UPDATE autores SET nome = $1,
		sobrenome = $2,
		email = $3,
		senha = $4 WHERE id = $5
		RETURNING *`,
		values: [nome, sobrenome, email, senha, id],
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

const atualizarSaldo = async (authorId, valor) => {
	const { saldo } = await obterAutor(authorId);
	const query = {
		text: `UPDATE autores SET saldo = $1 WHERE id = $2
		RETURNING *`,
		values: [Number(saldo) + valor, authorId],
	};

	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = {
	adicionarAutor,
	obterAutor,
	obterAutores,
	deletarAutor,
	atualizarAutor,
	obterAutorPorEmail,
	atualizarSaldo,
};
