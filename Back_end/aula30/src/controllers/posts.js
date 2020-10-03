const biblioteca = require('../repositories/biblioteca');
const response = require('../utils/response');

let posts;
let autores;

const pegarAutores = async () => {
	await biblioteca.criarTabelaAutores();
	autores = await biblioteca.obterAutores();
};

const pegarPosts = async () => {
	await biblioteca.criarTabelaPosts();
	posts = await biblioteca.obterPosts();
};
pegarAutores();
pegarPosts();

const obterPosts = (ctx) => {
	const { id_autor = null, publicado = true } = ctx.query;
	if (id_autor) {
		const autorPosts = posts.filter(
			(post) => post.autor === id_autor && !post.deletado
		);

		if (autorPosts.length >= 1) {
			response(ctx, 200, autorPosts);
		} else {
			response(ctx, 404, { message: 'Não Encontrado' });
		}
	} else {
		const estaPublicado = publicado === 'true';
		const publicados = posts.filter(
			(post) => !post.deletado && post.publicado === estaPublicado
		);
		response(ctx, 200, publicados);
	}
};

const obterPost = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const postAtual = await biblioteca.obterPost(id);
		if (postAtual) {
			response(ctx, 200, postAtual);
		} else {
			response(ctx, 404, { message: 'Post não encontrado' });
		}
	} else {
		response(ctx, 400, { message: 'Mal formatado' });
	}
};

const adicionarPost = async (ctx) => {
	const body = ctx.request.body;
	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	} else if (
		!(await biblioteca.obterAutor(body.autor)) ||
		(await biblioteca.obterAutor(body.autor)).deletado === true
	) {
		return response(ctx, 403, { message: 'Pedido proibido' });
	}

	const result = await biblioteca.adicionarPost(body);
	response(ctx, 201, result);
	pegarPosts();
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
		const postAtual = await biblioteca.obterPost(id);
		if (postAtual) {
			let result;
			if (conteudo) {
				result = await biblioteca.atualizarPost(
					'conteudo',
					conteudo,
					id
				);
			}
			if (titulo) {
				result = await biblioteca.atualizarPost('titulo', titulo, id);
			}
			if (subtitulo) {
				result = await biblioteca.atualizarPost(
					'subtitulo',
					subtitulo,
					id
				);
			}
			if (publicado) {
				result = await biblioteca.atualizarPost(
					'publicado',
					publicado,
					id
				);
			}
			response(ctx, 200, result);
			pegarPosts();
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

const deletarPost = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const postAtual = await biblioteca.obterPost(id);
		if (postAtual) {
			const result = await biblioteca.deletarPost(id);
			response(ctx, 200, result);
			pegarPosts();
		}
	} else {
		response(ctx, 404, { message: 'Post não encontrado' });
	}
};

module.exports = {
	obterPosts,
	obterPost,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
