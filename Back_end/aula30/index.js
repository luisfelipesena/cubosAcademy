const Koa = require('koa');
const server = new Koa();
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const response = require('./src/utils/response');
require('dotenv').config();

server.use(bodyparser());
server.use(router.routes());

const PORT = process.env.PORT || 8000;
server.use((ctx) => response(ctx, 404, 'Conteúdo não encontrado'));
server.listen(PORT, () => console.log('Rodando na porta ', PORT));
