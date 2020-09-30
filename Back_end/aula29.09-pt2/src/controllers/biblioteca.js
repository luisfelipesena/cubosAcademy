const response = require('../utils/response');
const biblioteca = require('../repositories/biblioteca');

let livros;
const lerLivros = async () => {
	await biblioteca.criarBiblioteca();
	livros = await biblioteca.obterLivros();
};
lerLivros();

const obterLivros = async (ctx) => {
	const { autor = null, deletado = false } = ctx.query;
	const estado = deletado === 'true';
	if (!autor) {
		ctx.body = livros.filter((livro) => livro.deletado === estado);
		return;
	}

	ctx.body = livros.filter(
		(livro) => livro.deletado === estado && livro.autor === autor
	);
};

const obterLivro = async (ctx) => {
	const { id = null } = ctx.params;

	if (!id) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	const livro = await biblioteca.obterLivro(id);

	if (livro) {
		ctx.body = { livro };
		return;
	}

	ctx.status = 404;
	ctx.body = { livro: null };
};

const adicionarLivro = async (ctx) => {
	const body = ctx.request.body;

	if (!body.titulo || !body.autor) {
		response(ctx, 400, 'Pedido mal formatado');
		return;
	}

	const novoLivro = {
		titulo: body.titulo,
		autor: body.autor,
		deletado: body.deletado ? body.deletado : false,
	};

	const result = await biblioteca.adicionarLivro(novoLivro);
	response(ctx, 201, result);
	lerLivros();
};

const deletarTabelaLivros = async (ctx) => {
	await biblioteca.dropBiblioteca();
	response(ctx, 201, 'Tabela Deletada');
};

module.exports = {
	obterLivros,
	obterLivro,
	adicionarLivro,
	deletarTabelaLivros,
};
