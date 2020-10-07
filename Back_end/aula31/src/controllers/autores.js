const response = require('./response');
const Autores = require('../repositories/autores');
const Posts = require('../repositories/posts');

const obterAutores = async (ctx) => {
	const result = await Autores.obterAutores();
	return response(ctx, 200, result);
};

const obterAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const result = await Autores.obterAutor(id);
		if (result) {
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Autor não encontrado' });
	}

	return response(ctx, 400, { message: 'Mal formatado' });
};

const adicionarAutor = async (ctx) => {
	const { nome = null, sobrenome = null, email = null } = ctx.request.body;

	const { hash } = ctx.state;

	if (!nome || !sobrenome || !email) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existencia = await Autores.obterAutorPorEmail(email);

	if (existencia) {
		return response(ctx, 400, { message: 'Autor já existente' });
	}

	const autor = {
		nome,
		sobrenome,
		email,
		senha: hash,
	};
	const result = await Autores.adicionarAutor(autor);
	return response(ctx, 201, result);
};

const atualizarAutor = async (ctx) => {
	const { id = null } = ctx.params;
	const {
		nome = null,
		sobrenome = null,
		email = null,
		senha = null,
	} = ctx.request.body;

	if (!nome && !sobrenome && !email && !senha) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}

	if (id) {
		const autorAtual = await Autores.obterAutor(id);
		if (autorAtual) {
			const autorAtualizado = {
				...autorAtual,
				nome: nome ? nome : autorAtual.nome,
				sobrenome: sobrenome ? sobrenome : autorAtual.sobrenome,
				email: email ? email : autorAtual.email,
				senha: senha ? senha : autorAtual.senha,
			};

			const result = await Autores.atualizarAutor(autorAtualizado);
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Autor não encontrado' });
	}
	return response(ctx, 404, { message: 'Autor não encontrado' });
};

const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const autorAtual = await Autores.obterAutor(id);
		const postsAutor = await Posts.obterPostsDeAutor(id);
		if (autorAtual) {
			if (estado === true && postsAutor.length > 0) {
				return response(ctx, 403, { message: 'Ação proibida' });
			}

			const result = await Autores.deletarAutor(id, true);

			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Autor não encontrado' });
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
