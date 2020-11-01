const database = require('../utils/database');

const adicionarPost = async (post) => {
	const { titulo, subtitulo, conteudo, autor } = post;
	const query = {
		text: `INSERT INTO posts (
			titulo, subtitulo, conteudo, autor
		) VALUES ($1, $2, $3, $4) RETURNING *;`,
		values: [titulo, subtitulo, conteudo, autor],
	};
	const result = await database.query(query);

	return result.rows.shift();
};

const deletarPost = async (id, estado) => {
	if (!estado) {
		return null;
	}

	const query = `UPDATE posts SET deletado = $1 WHERE id = $2 RETURNING *`;
	const result = await database.query({
		text: query,
		values: [estado, id],
	});

	return result.rows.shift();
};

const atualizarPost = async (post) => {
	const { id, titulo, subtitulo, conteudo, publicado } = post;
	const query = {
		text: `UPDATE posts SET titulo = $1, subtitulo = $2, conteudo = $3, publicado = $4 WHERE id = $5 RETURNING *`,
		values: [titulo, subtitulo, conteudo, publicado, id],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const obterPost = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM posts WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const obterPosts = async (deletado = false, publicado = true) => {
	const query = `SELECT * FROM posts WHERE deletado = $1 AND publicado = $2;`;
	const result = await database.query({
		text: query,
		values: [deletado, publicado],
	});

	return result.rows.shift();
};

const obterPostsDeAutor = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM posts WHERE autor = $1 AND deletado = false`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows;
};

const obterPostsPublicados = async (publicado = true) => {
	const query = `SELECT * FROM posts WHERE deletado = false AND publicado = $1`;
	const result = await database.query({
		text: query,
		values: [publicado],
	});

	return result.rows;
};

module.exports = {
	adicionarPost,
	obterPost,
	obterPosts,
	deletarPost,
	atualizarPost,
	obterPostsDeAutor,
	obterPostsPublicados,
};
