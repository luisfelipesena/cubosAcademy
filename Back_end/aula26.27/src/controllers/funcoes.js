const response = require('../utils/response');

const produtos = [];
/**
 * Função que obtem o Produto Específico
 */
const obterProduto = (ctx) => {
	if (ctx.params) {
		const id = ctx.params.id;
		for (let i = 0; i < produtos.length; i++) {
			if (produtos[i].id == id) {
				return response(ctx, 200, produtos[i]);
			}
		}
		return response(ctx, 404, 'Não Encontradoo');
	} else if (typeof ctx === 'number') {
		const id = ctx;
		for (let i = 0; i < produtos.length; i++) {
			if (produtos[i].id == id) {
				return produtos[i];
			}
		}
		return response(ctx, 404, 'Não Encontrado');
	}
	return response(ctx, 400, 'Má formatação');
};
/**
 * Função que adiciona um novo Produto a lista de produtos
 */
const adicionarProduto = (ctx) => {
	const body = ctx.request.body;
	if (body === undefined || !body) {
		return response(ctx, 400, { mensagem: 'Mal formatado' });
	}

	if (
		typeof body.id === 'number' &&
		body.nome &&
		body.quantidade &&
		body.valor
	) {
		const produto = obterProduto(body.id);
		if (produto !== false) {
			produtos.splice(-1);
			return response(ctx, 400, {
				mensagem: 'Produto já existente',
			});
		} else {
			const objetoProduto = {
				id: body.id,
				nome: body.nome,
				peso: body.peso ? body.peso : 'N/A',
				quantidade: body.quantidade,
				estoqueMax: body.quantidade,
				valor: body.valor * 100,
				deletado: false,
			};
			produtos.push(objetoProduto);
		}
	} else {
		produtos.splice(-1);
		return response(ctx, 400, { mensagem: 'Mal formatado' });
	}

	return response(ctx, 201, produtos.slice(-1));
};

module.exports = { obterProduto, adicionarProduto };
