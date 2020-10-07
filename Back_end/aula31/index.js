const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const schema = require('./src/utils/schema');
const response = require('./src/controllers/response');
schema.up();
const server = new Koa();

server.use(bodyparser());
server.use(router.routes());

server.use((ctx) =>
	response(ctx, 404, { mensagem: 'Conteúdo não encontrado' })
);
server.listen(8081, () => console.log('Rodando!'));
