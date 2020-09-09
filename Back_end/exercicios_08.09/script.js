const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");
server.use(bodyparser());

let autores = []; //linkagem dos dois arrays com id autor em posts 
let posts = [];

const contexto = async (ctx) => {
    const url = ctx.url;
    const method = ctx.method;
    const body = ctx.request.body;
    if (url === "/autor") {
       
        if (method === "POST") { //Criar um novo autor
            const autor = criarAutor(body);

            if (autor !== null) {
                sucesso(ctx,body);
            }

            else {
                erro(ctx,400,"Mal formatada");
            }
        }

        else {
            erro(ctx,405,"Método Não Permitido");
        }
    }

    else if (url.includes("/autor/")) {
        const barras = url.split("/");
        const identificador = barras[2]; //pode ser o CPF

        if (method === "GET") { //Obter info de um Autor
            const autor = procurarAutor(identificador);

            if (!autor || autor.deletado === true) {
                erro(ctx, 404, "Não Encontrado");
            }

            else {
                sucesso(ctx,autor);
            }

        }

        else if (method === "DELETE") { //Deletar um autor 
            const autor = procurarAutor(identificador);

            if (!autor) {
                erro(ctx, 404, "Não Encontrado");
            }

            else {
                const deletar = deletarAutor(autor);

                if (!deletar) {
                    erro(ctx, 400, "Autor com post publicado");
                }

                else {
                    sucesso(ctx,`Autor ${autor.primeiro_nome} de id: ${autor.id}, deletado com sucesso`);
                }
                
            }
        }

        else if (method === "PUT") { //atualizar um autor
            const autor = procurarAutor(identificador);

            if (!autor) {
                erro (ctx,400,"Não Encontrado");
            }

            else {
                const atualizacao = atualizarAutor(autor,body);

                if (atualizacao !== null) {
                    sucesso(ctx,atualizacao);
                }

                else {
                    erro(ctx,404,"Mal formatado");
                }
            }
        }

        else {
            erro(ctx,405,"Método não permitido");
        }
    }

    else if (url === "/posts") {
        if (method === "GET") { //obtém todos os posts menos os deletados
            const filterPosts = posts.reverse().filter((item) => item.deletado === false)
            sucesso(ctx,filterPosts);
        } 
        
        else if (method === "POST") { //Cria um novo post
            if (body.id && body.idAutor) {
                const adicionar = adicionarPost(body.id,body);

                if (adicionar) {
                    sucesso(ctx,adicionar);
                }

                else if (adicionar === null) {
                    erro (ctx,403,"Proibido");
                }

                else {
                    erro (ctx, 400, "Mal formatado");
                }
            }

            else {
                erro(ctx,400,"Mal formatado");
            }
        }
 
        else {
            erro (ctx,405,"Método Não Permitido");
        }
    }

    else if (url.includes("/posts/")) {
        const barras = url.split("/");
        const identificador = barras[2];

        if (method === "GET") { //Obter um post específico
            const obter = procurarPost(identificador);

            if (obter) {
                sucesso(ctx,obter);
            }

            else {
                erro(ctx,404,"Não encontrado");
            }
        }

        else if (method === "PUT") { //atualizar um post específico
            const post = procurarPost(identificador);

            if (post) {
                const atualizacao = atualizarPost(post,body);

                if (atualizacao && post.deletado === false) {
                    sucesso(ctx,atualizacao);
                }

                else {

                    if (post.deletado === true) {
                        erro (ctx, 404, "Não Encontrado");
                    }

                    else {
                        erro (ctx, 400, "Mal formatado");
                    }
                }

            }

            else {
                erro (ctx,404,"Não encontrado");
            }
        }

        else if (method === "DELETE") {
            const post = procurarPost(identificador);

            if (post) {
                deletarPost(post);
                sucesso(ctx,`Post de id: ${post.id}, deletado com sucesso`);
            }

            else {
                erro (ctx,404,"Não encontrado");
            }
        }
    }

    else if (url.includes("/posts?")) {
        if (method === "GET") {
            const idAutor = ctx.query.autor;
            
            if (idAutor) {
                let postsAutor = posts.filter(item => item.idAutor == idAutor) ;
                sucesso(ctx,postsAutor);
            }
            
            else {
                erro(ctx,400,"Não Encontrado");
            }
        }

        else {
            erro (ctx,405,"Método não permitido");
        }
    }

    else {
        erro(ctx,404,"Não Encontrado");
    }

}

function sucesso (ctx,entidade) {
    ctx.status = 200;
    ctx.body = {
        status: "sucesso",
        dados: entidade
    }
}

function erro (ctx,status,mensagem) {
    ctx.status = status;
    ctx.body = {
        status: "erro",
        dados: {
            mensagem: mensagem,
        }
    }
}

function procurarAutor (id) {
    for (let i = 0; i < autores.length; i++) {
        if (autores[i].id === id) {
            return autores[i];
        }
    }
    return false;
}

function criarAutor (body) {
    if (body.id && body.primeiro_nome) {
        body.id = body.id.toString();
        if (!procurarAutor(body.id)) {
            autores.push({
                ["primeiro_nome"]: body.primeiro_nome, 
                ["ultimo_nome"]: (body.ultimo_nome)? body.ultimo_nome :null,
                ["id"]: body.id,
                ["email"]: (body.email)? body.email :"Email não informado",
                ["senha"]: (body.senha)? body.senha :"Senha não informada",
                ["deletado"]: false,
            });
            return true;
        }
    }
    return null;
}

function deletarAutor (autor) {
    for (let i = 0; i < posts.length; i++) {
        if (autor.id === posts[i].idAutor && posts[i].publicado === true) { 
            return false;
        }
    }
    const index = autores.indexOf(autor);
    autores[index].deletado = true;
    return true;
}

function atualizarAutor (autor,body) {
    const index = autores.indexOf(autor);
    if (body.primeiro_nome) {
        autores[index].primeiro_nome = body.primeiro_nome;
        return autores[index];
    }

    if (body.ultimo_nome) {
        autores[index].ultimo_nome = body.ultimo_nome;
        return autores[index];
    }

    if (body.email) {
        autores[index].email = body.email;
        return autores[index];
    }

    if (body.senha) {
        autores[index].senha = body.senha;
        return autores[index];
    }

    return null;
    
}

function procurarPost (idPost) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === idPost) {
            return posts[i];
        }
    }
    return false;
}

function adicionarPost (idPost,body) {
    const post = procurarPost(idPost);
    const autor = procurarAutor(body.idAutor);

    if (!post && typeof(body.publicado) == "boolean" && body.titulo && body.subtitulo && body.idAutor && autor.deletado === false) {
        body.idAutor = body.idAutor.toString();
        posts.push({
            ["id"]: idPost,
            ["titulo"]: body.titulo,
            ["subtitulo"]: body.subtitulo,
            ["idAutor"]: body.idAutor,
            ["publicado"]: body.publicado,
            ["deletado"]: false
        })
        return posts.slice(-1);
    }

    else if (autor.deletado === true) {
        return null
    }

    else {
        return false;
    }
}

function atualizarPost (post,body) {
    const index = posts.indexOf(post);
    if (!body.titulo && !body.subtitulo && !body.idAutor && body.publicado == null) {
        return null;
    }

    if (body.titulo) {
        posts[index].titulo = body.titulo;
    }

    if (body.subtitulo) {
        posts[index].subtitulo = body.subtitulo;
    }

    if (body.idAutor) {
        const autor = procurarAutor(body.idAutor);
        if (autor) {
            posts[index].idAutor = body.idAutor;
        }

        else {
            return null;
        }
        
    }

    if (body.publicado == true || body.publicado == false) {
        posts[index].publicado = body.publicado;
    }

    return posts[index];
}

function deletarPost (post) {
    const index = posts.indexOf(post);
    posts[index].deletado = true;
}

server.use(contexto);
server.listen(8081, () => console.log("ONLINE"));