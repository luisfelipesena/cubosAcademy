const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");

server.use(bodyparser()); // add no ctx.request.body as infos provinientes do body

const tarefa = {
    titulo: 'Preparar Aula',
    descricao : 'Aula dia 21',
    concluida: false,
    deletado: false
}

const listaDeTarefas = [tarefa];

const obterListaDeTarefas = () => {
    const listaSemDeletados = [];
    listaDeTarefas.forEach(item => {
        if(!item.deletado) {
            listaSemDeletados.push(item);
        }
    });
    return listaSemDeletados;
}

const adicionarTarefa = (tarefa) => {
    const novaTarefa = {
        titulo: tarefa.titulo? tarefa.titulo :'Tarefa sem Título',
        descricao: tarefa.descricao? tarefa.descricao :'Descrição sem Título',
        concluida: tarefa.concluida? tarefa.concluida :false,
        deletada: false
    };
    listaDeTarefas.push(novaTarefa);
    return novaTarefa;
}

const obterTarefa = (index) => {
    const tarefa = listaDeTarefas[index];
    if (tarefa) {
        return tarefa;
    }
    else {
        return null;
    }
}

const deletarTarefa = (index) => {
    const tarefa = listaDeTarefas[index];
    if (tarefa) {
        listaDeTarefas.splice(index,1);
        return true;
    }

    else {
        return false;
    }
}

const atualizarConclusaoTarefa = (index,estado) => {
    const tarefa = obterTarefa(index);
    if (tarefa) {
        const tarefaAtualizada = {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            concluida: estado,
            deletado: tarefa.deletado,
        };

        listaDeTarefas.splice(index,1,tarefaAtualizada);
        return tarefaAtualizada;
    }
    else {
        return false;
    }
    
}


const contexto = async (ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    if (path === '/tarefas') {

        if (method === "GET") { //listar tarefas
            ctx.body = obterListaDeTarefas();
        }

        else if (method == "POST") {
            const novaTarefa = ctx.request.body;
            const tarefa = adicionarTarefa(novaTarefa);
            ctx.body = tarefa;
        }

        else {
            ctx.status = 404;
            ctx.body = 'Não Encontrado';
        }
        
    }
    
    else if (path.includes("/tarefas/")) { 
        const paths = path.split("/");
        if (paths[1] === "tarefas") {
            const index = paths[2];
            if (index) {
                if (method === "GET") {
                    ctx.body = obterTarefa(index); 
                }
        
                else if (method === "DELETE") {
                    const resposta = deletarTarefa(index);
                    if (resposta) {
                        ctx.body = "Tarefa Deletada";
                    }
                    else {
                        ctx.body = "Não foi possível deletar a tarefa";
                    }
                }

                else if (method == "PUT") {
                    const estado = ctx.request.body.estado;
                    if (index && estado == true && estado == false) {
                        ctx.status = 400;
                        ctx.body = "Requisição mal formatada";
                    }
        
                    else {
                        ctx.body = "Tarefa Concluida";
                        const resposta = atualizarConclusaoTarefa(index,estado);
                        if (resposta) {
                            ctx.body = resposta;
                        }
                        else {
                            ctx.status = 404;
                            ctx.body = "Não foi possivel atualizar";
                        }
                    }
                }

                else {
                    ctx.status = 404;
                    ctx.body = "Não encontrado";
                } 
            }       
        }
    }


    else {
        ctx.status = 404;
        ctx.body = "Não encontrado";
    }
}

server.use(contexto);

server.listen(8081,() => {
    console.log("O N L I N E !");
})