const client = require('../utils/database');
const nomeTabelaPosts = 'posts';
const nomeTabelaAutores = 'autores';

const criarTabelaPosts = async () => {
	const query = `CREATE TABLE IF NOT EXISTS ${nomeTabelaPosts} (
	id SERIAL,
	titulo TEXT,
	conteudo TEXT,
	subtitulo TEXT,
	autor TEXT,
	publicado BOOLEAN DEFAULT FALSE,
	deletado BOOLEAN DEFAULT FALSE
	)`;
	return client.query(query);
};

const criarTabelaAutores = async () => {
	const query = `CREATE TABLE IF NOT EXISTS ${nomeTabelaAutores} (
	id SERIAL,
	nome TEXT,
	sobrenome TEXT,
	email TEXT,
	senha TEXT,
	deletado BOOLEAN DEFAULT FALSE
	)`;
	return client.query(query);
};

const adicionarPost = async (body) => {
	const query = {
		text: `INSERT INTO ${nomeTabelaPosts} (titulo,conteudo,subtitulo,autor)
		VALUES($1,$2,$3,$4) RETURNING *`,
		values: [body.titulo, body.conteudo, body.subtitulo, body.autor],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const adicionarAutor = async (body) => {
	const query = {
		text: `INSERT INTO ${nomeTabelaAutores} (nome,sobrenome,email,senha)
		VALUES($1,$2,$3,$4) RETURNING *`,
		values: [body.nome, body.sobrenome, body.email, body.senha],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const obterAutores = async () => {
	const query = `SELECT * FROM ${nomeTabelaAutores}`;
	const result = await client.query(query);
	return result.rows;
};

const obterAutor = async (id) => {
	const query = {
		text: `SELECT * FROM ${nomeTabelaAutores}
		WHERE id = $1`,
		values: [id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const obterPosts = async () => {
	const query = `SELECT * FROM ${nomeTabelaPosts}`;
	const result = await client.query(query);
	return result.rows;
};

const obterPost = async (id) => {
	const query = {
		text: `SELECT * FROM ${nomeTabelaPosts}
			WHERE id = $1`,
		values: [id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const atualizarAutor = async (prop, valorProp, id) => {
	const query = {
		text: `UPDATE ${nomeTabelaAutores}
		SET ${prop} = $1
		WHERE id = $2 RETURNING *`,
		values: [valorProp, id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const atualizarPost = async (prop, valorProp, id) => {
	const query = {
		text: `UPDATE ${nomeTabelaPosts}
		SET ${prop} = $1
		WHERE id = $2 RETURNING *`,
		values: [valorProp, id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const deletarPost = async (id) => {
	const query = {
		text: `UPDATE ${nomeTabelaPosts}
		SET deletado = true
		WHERE id = $1 RETURNING *`,
		values: [id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const deletarAutor = async (id) => {
	const query = {
		text: `UPDATE ${nomeTabelaAutores}
		SET deletado = true
		WHERE id = $1 RETURNING *`,
		values: [id],
	};
	const result = await client.query(query);
	return result.rows.shift();
};

const dropAutores = async () => {
	return client.query(`DROP TABLE ${nomeTabelaAutores}`);
};

const dropPosts = async () => {
	return client.query(`DROP TABLE ${nomeTabelaPosts}`);
};

module.exports = {
	criarTabelaAutores,
	criarTabelaPosts,
	obterAutores,
	obterAutor,
	obterPosts,
	obterPost,
	adicionarAutor,
	adicionarPost,
	atualizarPost,
	atualizarAutor,
	deletarPost,
	deletarAutor,
	dropAutores,
	dropPosts,
};
