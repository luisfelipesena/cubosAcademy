const response = (ctx, code, mensagem) => {
	const status = code >= 200 && code <= 399 ? 'sucesso' : 'erro';
	ctx.status = code;
	ctx.body = {
		status: status,
		dados: mensagem,
	};
};

module.exports = response;
