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

const obterAutores = (ctx) => {
	const autoresAtivos = autores.filter((autor) => !autor.deletado);
	response(ctx, 200, autoresAtivos);
};

const obterAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const autorAtual = await biblioteca.obterAutor(id);
		if (autorAtual) {
			response(ctx, 200, autorAtual);
		} else {
			response(ctx, 404, { message: 'Autor não encontrado' });
		}
	} else {
		response(ctx, 400, { message: 'Mal formatado' });
	}
};

const adicionarAutor = async (ctx) => {
	const { nome, sobrenome, email, senha } = ctx.request.body;
	if (!nome || !sobrenome || !email || !senha) {
		response(ctx, 400, 'Pedido mal-formatado');
		return;
	}

	const existencia = autores.filter(
		(item) => item.nome == nome && item.email == email && !item.deletado
	);

	if (existencia.length !== 0) {
		return response(ctx, 400, { message: 'Autor já existente' });
	}

	const result = await biblioteca.adicionarAutor(ctx.request.body);
	response(ctx, 201, result);
	pegarAutores();
};

const atualizarAutor = async (ctx) => {
	const { id = null } = ctx.params;
	const { nome, sobrenome, email, senha } = ctx.request.body;

	if (!nome && !sobrenome && !email && !senha) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}

	if (id) {
		const autorAtual = await biblioteca.obterAutor(id);
		if (autorAtual) {
			let result;
			if (nome) {
				result = await biblioteca.atualizarAutor('nome', nome, id);
			}
			if (sobrenome) {
				result = await biblioteca.atualizarAutor(
					'sobrenome',
					sobrenome,
					id
				);
			}
			if (email) {
				result = await biblioteca.atualizarAutor('email', email, id);
			}
			if (senha) {
				result = await biblioteca.atualizarAutor('senha', senha, id);
			}
			response(ctx, 200, result);
			pegarAutores();
		} else {
			response(ctx, 404, { message: 'Autor não encontrado' });
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const autorAtual = await biblioteca.obterAutor(id);
		const postsAutor = posts.filter((post) => post.autor === id);
		if (autorAtual) {
			if (postsAutor.length > 0) {
				return response(ctx, 403, { message: 'Ação proibida' });
			}

			const result = await biblioteca.deletarAutor(id);
			response(ctx, 200, result);
			pegarAutores();
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
