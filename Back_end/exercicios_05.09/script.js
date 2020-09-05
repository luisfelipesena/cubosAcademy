const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");
server.use(bodyparser());

const urls = []; //associar o id com a url original

const gerarId = () => Math.random().toString(36).substr(2, 9); //gerar uma id diferente para cada link criado

const obterUrl = (codigo) => {
    for (let i = 0; i < urls.length; i++) {
        if (urls[i][codigo]) {
            return urls[i][codigo];
        } 
    }
    return null;
}

const erros = (ctx,status,mensagem) => {
    ctx.status = status;
    ctx.body = {
        status: 'erro',
        dados: {
            mensagem: mensagem,
        }
    }
}

const encurtarLink = (ctx,id) => {
    if (method === "POST") {
        const bodyUrl = ctx.request.body.url;
        if (bodyUrl) {
            urls.push({[id]: bodyUrl});
            ctx.status = 201; //conteúdo criado
            ctx.body = {
                status: "sucesso",
                dados: {
                    url_original : bodyUrl,
                    url_encurtada: `localhost:8081/${id}`
                }
            }
        }

        else {
            ctx.status = 400;
            ctx.body = {
                status: 'erro',
                dados: {
                    mensagem: "Url mal Formatada!",
                }
            }
        }
    }
}

const encurtarLinkComIdEspecifico = (ctx,arrayUrl) => {
    const idEspecifico = arrayUrl[2]; 
        if (idEspecifico) {
            const bodyUrl = ctx.request.body.url;
            if (bodyUrl) {
                urls.push({[idEspecifico]: bodyUrl});
                ctx.status = 201; //conteúdo criado
                ctx.body = {
                    status: "sucesso",
                    dados: {
                        url_original : bodyUrl,
                        url_encurtada: `${idEspecifico}`
                    }
                }
            }
        }

        else {
            erros(ctx,400,"Url mal Formatada");
        }
}

const usarLinkEncurtado = (ctx,arrayUrl) => {
    const identificadorUrl = arrayUrl[1];
    const url_original = obterUrl(identificadorUrl);

    if (url_original != null) {
        ctx.status = 301;
        ctx.redirect(url_original);
    }

    else {
        erros(ctx,400,"Não Encontrada");
    }
}

const pegarLinksEncurtados = (ctx) => {
    ctx.body = urls;
}

const contexto = async (ctx) => {
    const method = ctx.method;
    const url = ctx.url;
    const id = gerarId();

    if (url === "/encurta") {
        
        if (method === "POST") {
           encurtarLink(ctx,id); 
        }

        else if (method === "GET") {
            pegarLinksEncurtados(ctx);
        }

        else {
            erros(ctx,405,"Método não permitido");
        }
    }
    
    else if (url.includes("/")) {
        const arrayUrl = url.split("/");
    
        if (method === "GET") {
           usarLinkEncurtado(ctx,arrayUrl);
        }

        else if (method === "POST") {
            encurtarLinkComIdEspecifico(ctx,arrayUrl);
        }

        else {
            erros(ctx,405,"Método Não Permitido");
        }
    }

    else {
        erros(ctx,404,"Conteúdo não encontrado");
    }
}

server.use(contexto);
server.listen(8081, () => console.log("ONLINE"))