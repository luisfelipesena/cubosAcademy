const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const response = require('./src/utils/response');
require('dotenv').config();

const server = new Koa();

server.use(bodyparser());
server.use(router.routes());

const PORT = process.env.PORT || 8000;
server.use((ctx) => response(ctx, 404, 'Conteúdo não Encontrado'));
server.listen(PORT, () => console.log('Rodando na porta', PORT));
