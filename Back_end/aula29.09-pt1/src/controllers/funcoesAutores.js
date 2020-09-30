const formatarSucesso = require('../utils/responses').formatarSucesso;
const formatarErro = require('../utils/responses').formatarErro;
const autores = require('../utils/posts_autores').autores;

const obterAutores = (ctx) => {
	formatarSucesso(
		ctx,
		autores.filter((autor) => !autor.deletado)
	);
};

const obterAutor = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			formatarSucesso(ctx, autorAtual);
		} else {
			formatarErro(ctx, 'Autor não encontrado', 404);
		}
	} else {
		formatarErro(ctx, 'Mal formatado', 400);
	}
};

const adicionarAutor = (ctx) => {
	const body = ctx.request.body;
	if (!body.nome || !body.sobrenome || !body.email || !body.senha) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	const existencia = autores.filter(
		(item) => item.nome == body.nome && item.email == body.email
	);
	if (existencia.length !== 0) {
		formatarErro(ctx, 'Autor já existente', 400);
		return;
	}

	const autor = {
		id: autores.length + 1,
		nome: body.nome,
		sobrenome: body.sobrenome,
		email: body.email,
		senha: body.senha,
		deletado: false,
	};

	autores.push(autor);
	formatarSucesso(ctx, autor, 201);
};

const atualizarAutor = (ctx) => {
	const { id = null } = ctx.params;
	const body = ctx.request.body;

	if (!body.nome && !body.sobrenome && !body.email && !body.senha) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			const autorAtualizado = {
				id: Number(id),
				nome: body.nome ? body.nome : autorAtual.nome,
				sobrenome: body.sobrenome
					? body.sobrenome
					: autorAtual.sobrenome,
				email: body.email ? body.email : autorAtual.email,
				senha: body.senha ? body.senha : autorAtual.senha,
				deletado: autorAtual.deletado,
			};

			autores[id - 1] = autorAtualizado;

			formatarSucesso(ctx, autorAtualizado, 200);
		}
	} else {
		formatarErro(ctx, 'Autor não encontrado', 404);
	}
};

const deletarAutor = (ctx) => {
	const { id = null } = ctx.params;
	const body = ctx.request.body;

	if (typeof body.estado !== 'boolean') {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			if (body.estado === true && obterPostsDeAutor(id).length > 0) {
				formatarErro(ctx, 'Ação proibida', 403);
				return;
			}

			const autorDeletado = {
				id: autorAtual.id,
				nome: autorAtual.nome,
				sobrenome: autorAtual.sobrenome,
				email: autorAtual.email,
				senha: autorAtual.senha,
				deletado: body.estado,
			};

			autores[id - 1] = autorDeletado;

			formatarSucesso(ctx, autorDeletado, 200);
		}
	} else {
		formatarErro(ctx, 'Usuário não encontrado', 404);
	}
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
