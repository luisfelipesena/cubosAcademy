const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();
const router = require('./src/routes');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
server.use(bodyparser());
server.use(router.routes());

const response = require('./src/utils/response');

server.use((ctx) => response(ctx, 404, 'Não Encontrado'));
server.listen(PORT, () => console.log('Rodando na porta', PORT));
