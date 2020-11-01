const response = require('./response');
const Posts = require('../repositories/posts');
const { autores, posts } = require('./base');

const obterPosts = async (ctx) => {
	const { id_autor: idAutor = null, publicado = true } = ctx.query;
	if (idAutor) {
		const autorPosts = await Posts.obterPostsDeAutor(idAutor);

		if (autorPosts.length >= 1) {
			return response(ctx, 200, autorPosts);
		}
		return response(ctx, 404, { message: 'Não Encontrado' });
	}
	const estaPublicado = publicado === 'true';
	const publicados = await Posts.obterPostsPublicados(estaPublicado);
	return response(ctx, 200, publicados);
};

const obterPost = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			return response(ctx, 200, postAtual);
		}

		return response(ctx, 404, { message: 'Post não encontrado' });
	}
	return response(ctx, 400, { message: 'Mal formatado' });
};

const adicionarPost = async (ctx) => {
	const { body } = ctx.request;

	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const post = {
		titulo: body.titulo,
		conteudo: body.conteudo,
		subtitulo: body.subtitulo,
		autor: body.autor,
	};

	const result = await Posts.adicionarPost(post);

	return response(ctx, 201, result);
};

const atualizarPost = async (ctx) => {
	const { id = null } = ctx.params;
	const {
		conteudo = null,
		titulo = null,
		subtitulo = null,
		publicado = false,
	} = ctx.request.body;

	if (!conteudo && !titulo && !subtitulo && !publicado) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const postAtual = await Posts.obterPost(id);
		if (postAtual) {
			const postAtualizado = {
				id: postAtual.id,
				conteudo: conteudo ? conteudo : postAtual.conteudo,
				titulo: titulo ? titulo : postAtual.titulo,
				subtitulo: subtitulo ? subtitulo : postAtual.subtitulo,
				publicado: publicado === true,
			};

			const result = await Posts.atualizarPost(postAtualizado);
			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Autor não encontrado' });
};

const deletarPost = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const postAtual = await Posts.obterPost(id);
		if (postAtual) {
			const result = await Posts.deletarPost(id, estado);

			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Post não encontrado' });
};

module.exports = {
	obterPosts,
	obterPost,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
