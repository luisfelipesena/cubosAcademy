const formatarSucesso = require('../utils/responses').formatarSucesso;
const formatarErro = require('../utils/responses').formatarErro;
const autores = require('../utils/posts_autores').autores;
const posts = require('../utils/posts_autores').posts;

const obterPosts = (ctx) => {
	let postsAutor = [];
	if (ctx.query.id_autor) {
		for (const x of posts) {
			if (ctx.query.id_autor == x.autor) {
				postsAutor.push(x);
			}
		}
		if (postsAutor.length >= 1) {
			formatarSucesso(ctx, postsAutor);
		} else {
			formatarErro(ctx, 'Não Encontrado');
		}
	} else if (ctx.url === '/posts') {
		formatarSucesso(
			ctx,
			posts.filter((post) => !post.deletado && !post.publicado)
		);
	} else {
		formatarErro(ctx, 'Conteúdo não encontrado');
	}
};

const obterPost = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			formatarSucesso(ctx, postAtual);
		} else {
			formatarErro(ctx, 'Post não encontrado', 404);
		}
	} else {
		formatarErro(ctx, 'Mal formatado', 400);
	}
};

const adicionarPost = (ctx) => {
	const body = ctx.request.body;

	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	} else if (autores[body.autor - 1].deletado === true) {
		formatarErro(ctx, 'Pedido proibido', 403);
		return;
	}

	const post = {
		id: posts.length + 1,
		titulo: body.titulo,
		conteudo: body.conteudo,
		subtitulo: body.subtitulo,
		autor: body.autor,
		publicado: false,
		deletado: false,
	};

	posts.unshift(post);

	formatarSucesso(ctx, post, 201);
};

const atualizarPost = (ctx) => {
	const { id = null } = ctx.params;
	const body = ctx.request.body;

	if (
		(!body.conteudo && !body.titulo && !body.subtitulo) ||
		typeof body.publicado !== 'boolean'
	) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				id: Number(id),
				conteudo: body.conteudo ? body.conteudo : postAtual.conteudo,
				titulo: body.titulo ? body.titulo : postAtual.titulo,
				subtitulo: body.subtitulo
					? body.subtitulo
					: postAtual.subtitulo,
				senha: body.senha ? body.senha : postAtual.senha,
				autor: postAtual.autor,
				publicado: !!body.publicado,
				deletado: postAtual.deletado,
			};

			posts[id - 1] = postAtualizado;

			formatarSucesso(ctx, postAtualizado);
		}
	} else {
		formatarErro(ctx, 'Autor não encontrado', 404);
	}
};

const deletarPost = (ctx) => {
	const { id = null } = ctx.params;
	const body = ctx.request.body;

	if (typeof body.estado !== 'boolean') {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				id: postAtual.id,
				titulo: postAtual.titulo,
				subtitulo: postAtual.subtitulo,
				conteudo: postAtual.conteudo,
				autor: postAtual.autor,
				publicado: postAtual.publicado,
				deletado: body.estado,
			};

			posts[id - 1] = postAtualizado;

			formatarSucesso(ctx, postAtualizado);
		}
	} else {
		formatarErro(ctx, 'Post não encontrado', 404);
	}
};

module.exports = {
	obterPosts,
	obterPost,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
