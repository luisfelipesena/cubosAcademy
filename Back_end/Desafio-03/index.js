const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const response = require('./src/utils/response');
const { up } = require('./src/utils/schema');

const server = new Koa();
up();
require('dotenv').config();

server.use(bodyparser());
server.use(router.routes());

const PORT = process.env.PORT || 8081;
server.use((ctx) => response(ctx, 404, 'Conteúdo não encontrado'));
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
