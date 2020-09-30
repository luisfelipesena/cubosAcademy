const formatarSucesso = (ctx, dados, status = 200) => {
	ctx.status = status;
	ctx.body = {
		status: 'sucesso',
		dados: dados,
	};
};

const formatarErro = (ctx, mensagem, status = 404) => {
	ctx.status = status;
	ctx.body = {
		status: 'erro',
		dados: {
			mensagem: mensagem,
		},
	};
};
module.exports = { formatarErro, formatarSucesso };
