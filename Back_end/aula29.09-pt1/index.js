const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const server = new Koa();
const formatarErro = require('./src/utils/responses').formatarErro;
require('dotenv').config();

server.use(bodyparser());
server.use((ctx, next) => {
	if (
		ctx.method !== 'GET' &&
		ctx.method !== 'POST' &&
		ctx.method !== 'PUT' &&
		ctx.method !== 'DELETE'
	) {
		formatarErro(ctx, 'Método Não Permitido', 405);
		return;
	}
	next();
});

server.use(router.routes());

const PORT = process.env.PORT || 8000;
server.use((ctx) => formatarErro(ctx, 'Conteúdo não encontrado'));
server.listen(PORT, () => console.log('Servidor rodando na Porta', PORT));
