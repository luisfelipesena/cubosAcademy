const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");
const router = require("./src/routes");
const response = require("./src/utils/response");
const up = require("./src/utils/schema").up;
up();

server.use(bodyparser());
server.use(router.routes());
require("dotenv").config();

const PORT = process.env.PORT || 8081;

server.use((ctx) => response(ctx, 404, "Conteúdo não encontrado"));
server.listen(PORT, () => console.log("Rodando na porta", PORT));
