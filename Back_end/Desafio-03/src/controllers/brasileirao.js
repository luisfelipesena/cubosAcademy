const response = require('../utils/response');
const Brasileirao = require('../repositories/brasileirao');
const { formatarTabela } = require('../utils/tabela');

const obterClassificacao = async (ctx) => {
	const tabela = await Brasileirao.obterTabela();
	return response(ctx, 200, tabela);
};

const obterJogosRodada = async (ctx) => {
	const { rodada = null } = ctx.params;
	if (!rodada) {
		return response(ctx, 400, 'Rodada não encontrada');
	}

	const result = await Brasileirao.obterJogosRodada(rodada);
	return response(ctx, 200, result);
};

const editarPlacar = async (ctx) => {
	const { id = null, golsCasa = null, golsVisitante = null } = ctx.request.body;
	if (id === null || golsCasa === null || golsVisitante === null) {
		return response(ctx, 400, 'Placar mal formatado');
	}

	const result = await Brasileirao.editarPlacar(id, golsCasa, golsVisitante);
	await formatarTabela();
	return response(ctx, 200, result);
};

module.exports = { obterClassificacao, obterJogosRodada, editarPlacar };
