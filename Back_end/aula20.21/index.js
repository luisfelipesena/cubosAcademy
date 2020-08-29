const Koa = require("koa");
const server = new Koa();

const contexto = async (ctx) => {
  ctx.body = "Olá, Mundo!";
  if (ctx.originalUrl == "/favicon.ico") {
    ctx.body = "QUEEE";
  }
  else if (ctx.originalUrl == "/mundo") {
    ctx.body = "JMMMMM";
  }
}

server.use(contexto);

server.listen(8081, () => {
  console.log("Servidor está rodando!");
}); 