const db = require('../utils/database');

const nomeTabela = 'biblioteca';

const criarBiblioteca = async () => {
	const query = `CREATE TABLE IF NOT EXISTS ${nomeTabela} (
		id SERIAL,
		titulo TEXT,
		autor TEXT,
		deletado BOOL DEFAULT FALSE
	)`;

	return db.query(query);
};

const dropBiblioteca = async () => {
	return db.query(`DROP TABLE ${nomeTabela}`);
};

const adicionarLivro = async (livro) => {
	const query = {
		text: `INSERT INTO ${nomeTabela} (titulo, autor, deletado)
		VALUES ($1, $2, $3) RETURNING *`,
		values: [livro.titulo, livro.autor, livro.deletado],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

const obterLivros = async () => {
	const query = `SELECT * FROM ${nomeTabela}`;
	const result = await db.query(query);
	return result.rows;
};

const obterLivro = async (id) => {
	const query = {
		text: `SELECT * FROM ${nomeTabela} WHERE id = $1`,
		values: [id],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = {
	criarBiblioteca,
	adicionarLivro,
	obterLivros,
	obterLivro,
	dropBiblioteca,
};
