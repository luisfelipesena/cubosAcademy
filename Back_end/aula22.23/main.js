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

//CASA - Código Final
let correntistas = [];
correntistas.push({
    nome: 'Luis Felipe',
    idade: 18,
    idBanco: '104',
    agencia: '32112',
    conta: '1235467',
    cpf: '86394430501',
    saldo: 500000
});

const adicionarCorrentista = (correntista) => {
    if (correntista.idBanco && correntista.agencia && correntista.conta && correntista.cpf) {
        correntista.idBanco = correntista.idBanco.toString(); 
        correntista.agencia = correntista.agencia.toString(); 
        correntista.conta = correntista.conta.toString();
        correntista.cpf = correntista.cpf.toString();

        const correntistaFormatado = {
            nome: (correntista.nome)? correntista.nome :null,
            idade: (correntista.idade)? correntista.idade :null,
            idBanco: (correntista.idBanco)? (correntista.idBanco.length == 3)? correntista.idBanco :"Número do Banco Incompleto" :null,
            agencia: (correntista.agencia)? (correntista.agencia.length == 5)? correntista.agencia :"Número da Agência Incompleto" :null,
            conta: (correntista.conta)? (correntista.conta.length == 7)? correntista.conta :"Número da Conta Incompleto" :null,
            cpf: (correntista.cpf)? (correntista.cpf.length == 11)? correntista.cpf :"Cpf Incompleto" :null,
            saldo: (correntista.saldo)? correntista.saldo :null,
        }
    
        for (let i = 0; i < correntistas.length; i++) { //caso já exista
            if (correntistas[i].cpf == correntistaFormatado.cpf && correntistas[i].idBanco == correntistaFormatado.idBanco) {
                return false;
            }
        }
        
        return correntistaFormatado;
    }

    else { //caso os dados estejam incompletos
        return false;
    }
       
}

const procurarCorrentista = (index) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (i == index) {
            return correntistas[i];
        }
    }
    
    return null;
}

const atualizarCorrentista = (index,body) => { //nem saldo nem idBanco podem ser modificados
    const correntista = procurarCorrentista(index);
    if (body.nome) {
        correntista.nome = body.nome;
    }

    if (body.idade) {
        correntista.idade = body.idade;
    }

    if (body.agencia) {
        body.agencia = body.agencia.toString(); 
        body.agencia = (body.agencia.length == 5)? body.agencia :"Número da Agência Incompleto";
        correntista.agencia = body.agencia;
    }

    if (body.conta) {
        body.conta = body.conta.toString();
        body.conta = (body.conta.length == 7)? body.conta :"Número da Conta Incompleto";
        correntista.conta = body.conta;
    }

    if (body.cpf) {
        body.cpf = body.cpf.toString();
        body.cpf = (body.cpf.length == 11)? body.cpf :"Cpf Incompleto";
        correntista.cpf = body.cpf;
    }

    else if (body.cpf == null  && body.nome == null  && body.idade == null && body.agencia == null && body.conta == null) {
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
                ctx.status = 400;
                ctx.body = "Formulário mal formatado";
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

                else { 
                    const body = ctx.request.body;
                    const correntistaAtualizado = atualizarCorrentista(id,body);
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
                    ctx.body = `Correntista ${resposta.nome} do Banco ${resposta.idBanco}, deletado com sucesso`; //Pode ser o CPF Também
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