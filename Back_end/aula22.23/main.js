const Koa = require("koa");
const server = new Koa();
const bodyparser = require ("koa-bodyparser");
server.use(bodyparser()); // add no ctx.request.body as infos provinientes do body

//CLASSE
//Questão 0 
// const contexto = async (ctx) => {
//     ctx.body = "Hello World!";
// }

// server.use(contexto);

// server.listen(8081, () => {
//     console.log("Servidor ta ON!");
// })

//Questão 1
//correntistas será usado durante o código
let correntistas = [];
correntistas.push({
    nome: 'Luis Felipe',
    idade: 18,
    cpf: "86394430501",
    saldo: 500000
});

// const contexto = async (ctx) => {
//     const path = ctx.url;
//     const method = ctx.method;
//     if (path == "/correntistas") {

//         if (method === "GET") {
//             ctx.body = correntistas;
//         }

//         else {
//             ctx.status = 404;
//             ctx.body = "Não Encontrada";
//         }
//     }

//     else {
//         ctx.status = 404;
//         ctx.body = "Não Encontrada";
//     }     
// }

// server.use(contexto);

// server.listen(8081, () => {
//     console.log("Servidor ta ON!");
// })

//Questão 2
// const adicionarCorrentista = (correntista) => {
//     const correntistaFormatado = {
//         nome: (correntista.nome)? correntista.nome :null,
//         idade: (correntista.idade)? correntista.idade :null,
//         cpf: (correntista.cpf)? (correntista.cpf.length == 11)? correntista.cpf :"Cpf Incompleto" :null,
//         saldo: (correntista.saldo)? correntista.saldo :null,
//     }

//     for (let i = 0; i < correntistas.length; i++) {
//         if (correntistas[i].cpf == correntistaFormatado.cpf) {
//             return false;
//         }
//     }
    
//     return correntistaFormatado;
       
// }

// const contexto = async (ctx) => {
//     const path = ctx.url;
//     const method = ctx.method;
//     if (path == "/correntistas") {

//         if (method === "GET") {
//             ctx.body = correntistas;
//         }

//         else if (method == "POST") {
//             const correntista = ctx.request.body;
//             const resposta = adicionarCorrentista(correntista);
//             if (!resposta) {
//                 ctx.status = 404;
//                 ctx.body = "Correntista já existente";
//             }
//             else {
//                 ctx.body = resposta;
//                 correntistas.push(resposta);
//             }
//         }

//         else {
//             ctx.status = 404;
//             ctx.body = "Não Encontrada";
//         }
//     }
    
//     else {
//         ctx.status = 404;
//         ctx.body = "Não Encontrada";
//     }     
// }

// server.use(contexto);

// server.listen(8081, () => {
//     console.log("Servidor ta ON!");
// })

//CASA
//Questão 3 e 4 - Código Final
const adicionarCorrentista = (correntista) => {
    const correntistaFormatado = {
        nome: (correntista.nome)? correntista.nome :null,
        idade: (correntista.idade)? correntista.idade :null,
        cpf: (correntista.cpf)? (correntista.cpf.length == 11)? correntista.cpf :"Cpf Incompleto" :null,
        saldo: (correntista.saldo)? correntista.saldo :null,
    }

    for (let i = 0; i < correntistas.length; i++) {
        if (correntistas[i].cpf == correntistaFormatado.cpf) {
            return false;
        }
    }
    
    return correntistaFormatado;
       
}

const procurarCorrentista = (index) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (i == index) {
            return correntistas[i];
        }
    }
    
    return null;
}

const atualizarCorrentista = (index,nome,idade,cpf) => { //É Possível mudar apenas esses parâmetros
    const correntista = procurarCorrentista(index);
    if (nome) {
        correntista.nome = nome;
    }

    if (idade) {
        correntista.idade = idade;
    }

    if (cpf) {
        cpf = (cpf.length == 11)? cpf :"Cpf Incompleto",
        correntista.cpf = cpf;
    }

    else if ((cpf == null || cpf == "") && (nome == null || nome == "") && (idade == null || idade == "")) {
        return null;
    }

    return correntista;
   
}

const deletarCorrentista = (index) => {
    correntistas.splice(index,1);
}

const contexto = async (ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    if (path == "/correntistas") {

        if (method === "GET") { 
            ctx.body = correntistas;
        }

        else if (method === "POST") {
            const correntista = ctx.request.body;
            const resposta = adicionarCorrentista(correntista);
            if (!resposta) {
                ctx.status = 404;
                ctx.body = "Correntista já existente";
            }
            else {
                ctx.body = resposta;
                correntistas.push(resposta);
            }
        }

        else {
            ctx.status = 404;
            ctx.body = "Não Encontrada";
        }
    }
    
    else if (path.includes("/correntistas/")) {
        const pathFormatado = path.split("/");
        const id = pathFormatado[2];
        if (id) {
            if (method === "PUT") {
                const resposta = procurarCorrentista(id);
                if (resposta == null) {
                    ctx.status = 404;
                    ctx.body = "Não Encontrado";
                }

                else { //saldo não pode ser modificado
                    const nome = ctx.request.body.nome;
                    const idade = ctx.request.body.idade;
                    const cpf = ctx.request.body.cpf;
                    const correntistaAtualizado = atualizarCorrentista(id,nome,idade,cpf);
                    if (correntistaAtualizado == null) {
                        ctx.status = 400;
                        ctx.body = "Requisição mal formatada";
                    }

                    else {
                        ctx.body = correntistaAtualizado;
                    }
                }
            }

            else if (method === "DELETE") {
                const resposta = procurarCorrentista(id);
                if (resposta == null) {
                    ctx.status = 404;
                    ctx.body = "Não Encontrado";
                }

                else {
                    deletarCorrentista(id);
                    ctx.body = `Correntista: ${resposta.nome}, deletado com sucesso`; //Pode ser o CPF Também
                }
            }

            else if (method == "GET") {
                const resposta = procurarCorrentista(id);
                if (resposta == null) {
                    ctx.status = 404;
                    ctx.body = "Não Encontrado";
                }

                else {
                    ctx.body = resposta; //Correntista Específico
                }
            }
           
            else {
                ctx.status = 404;
                ctx.body = "Não Encontrado";
            }
        }

        else {
            ctx.status = 404;
            ctx.body = "Id Não Encontrado";
        }
    }

    else {
        ctx.status = 404;
        ctx.body = "Não Encontrada";
    }     
}

server.use(contexto);

server.listen(8081, () => {
    console.log("Servidor ta ON!");
})