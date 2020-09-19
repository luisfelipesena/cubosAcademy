const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const server = new Koa();
server.use(bodyparser());

let produtos = [];
let pedidos = [];

const contexto = async (ctx) => {
    const url = ctx.url;
    const method = ctx.method;
    const bodyJson = ctx.request.body; 
    if (url === "/products") {
        if (method === "POST") {  
            const resposta = addNovoProduto(bodyJson);
            if (resposta == null) {
                erro(ctx,400,"Produtos Mal Formatados"); 
            }

            else if (!resposta) {
                erro (ctx,400,"Produto já existente");
            }
            
            else {
                sucesso(ctx,201,resposta);
            }
        }

        else if (method === "GET") {
            const resposta = obterProdutos();
            if (resposta) {
                sucesso(ctx,200,resposta);
            }

            else {
                erro(ctx,404,"Produtos não Encontrados");
            }
        }

        else {
            erro(ctz,405,"Método não permitido");
        }
    }

    else if (url.includes("/products/")) {
        const barras = url.split("/");
        const id = barras[2];
        if (id) {
            if (method === "GET") {
                const resposta = obterProduto(id);
                if (resposta !== false) {
                    sucesso(ctx,200,resposta);
                }

                else {
                    erro(ctx,404,"Produto não encontrado");
                }
            }

            else if (method === "PUT") {
                const resposta = atualizarProduto(id,bodyJson);
                if (!resposta) {
                    erro(ctx,404,"Produto não encontrado");
                }

                else if (resposta === null) {
                    erro(ctx,400,"Produto mal formatado");
                }

                else {
                    sucesso(ctx,200,resposta);
                }
            }

            else if (method === "DELETE") {
                const resposta = deletarProduto(id);
                if (!resposta) {
                    erro(ctx,404,"Produto não encontrado");
                }

                else {
                    sucesso(ctx,200,resposta);
                }
            }

            else {
                erro(ctx,405,"Método Não Permitido");
            }
        }

        else {
            erro(ctx,400,"Sem Identificador")
        }
    }

    else if (url === "/orders") {
        if (method === "POST") {
            const resposta = novoPedido(bodyJson);
            if (resposta == null) {
                erro(ctx,400,"Pedido mal formatado");
            }

            else if (!resposta) {
                erro(ctx,400,"Pedido Já Existente");
            }

            else {
                sucesso(ctx,201,resposta);
            }
        }

        else if (method === "GET") {
            const resposta = obterPedidos();
            if (!resposta) {
                erro(ctx,404,"Não há Pedidos");
            }

            else {
                sucesso(ctx,200,resposta);
            }
        }

        else {
            erro(ctx,405,"Método Não Permitido");
        }
    }

    else if (url.includes("/orders/")) {
        const barras = url.split("/");
        const id = barras[2];
        const query = ctx.query;
        if (id) {
            if (method === "GET") {
                const resposta = obterPedido(id);
                if (!resposta) {
                    const respostaFuncao = obterPedidoStatus(id);
                    if (!respostaFuncao) {
                        erro(ctx,404,"Pedido não Encontrado");
                    }

                    else {
                        sucesso(ctx,200,respostaFuncao);
                    }  
                }

                else {
                    sucesso(ctx,200,resposta);
                }
            }

            else if (method === "PUT" && query.produto == null) {
                const resposta = modificarPedido(id,bodyJson,ctx);
                if (resposta == null) {
                    erro(ctx,404,"Não encontrado");
                }

                else if (!resposta) {
                    erro(ctx,400,"Pedido mal formatado");
                }

                else {
                    sucesso(ctx,200,resposta);
                }
            }

            else if (method === "PUT" && query.produto) {
                let idProduto = query.produto;
                let interrogacao = id.split("?");
                let idPedido = interrogacao[0];
                const resposta = atualizarQuantidadeProdutoAdd(idPedido,idProduto,bodyJson,ctx);
                if (resposta == null) {
                    erro(ctx,404,"Não encontrado");
                }

                else if (!resposta) {
                    erro(ctx,400,"Pedido mal formatado");
                }

                else {
                    sucesso(ctx,201,resposta);
                }
            }

            else if (method === "DELETE") {
                const resposta = deletarPedido(id);
                if (resposta == null) {
                    erro(ctx,404,"Pedido não encontrado");
                }

                else {
                    sucesso(ctx,200,resposta);
                }
            }

            else {
                erro(ctx,405,"Método Não Permitido");
            }

        }

        else {
            erro(ctx,404,"Sem Identificador")
        }
    }

    else {
        erro(ctx,404,"Página Não Encontrada");
    }
}


function addNovoProduto (body) { //Produto Adicionado em formato de Array (permite add simultâneas)
    let count = 0;
    if (body.length == undefined) {
        return null;
    }

    for (let i = 0; i < body.length; i++) {
        if (typeof(body[i].id) == "number" && body[i].nome && body[i].quantidade && body[i].valor) {
            let produto = obterProduto(body[i].id);
            if (produto != false) {
                if (count >= 1) {
                    produtos.splice(-count);
                }
                return false;
            }

            else {
                let objetoProduto = {
                    id: body[i].id, //Necessário passar o id do produto
                    nome: body[i].nome,
                    peso: (body[i].peso)? body[i].peso :"N/A",
                    quantidade: body[i].quantidade,
                    estoqueMax: body[i].quantidade,
                    valor: (body[i].valor * 100),
                    deletado: false,
                }
                produtos.push(objetoProduto);
                count++;
            } 
        }

        else {
            produtos.splice(-count);
            return null;
        }  
    }
    return produtos.slice(-count);
}

function obterProdutos () {
    const produtosAtivos = produtos.filter((item)=> !item.deletado);
    if (produtosAtivos.length >= 1) {
        return produtosAtivos;
    }

    else {
        return false;
    }
}

function obterProduto (id) {
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id && !produtos[i].deletado) {
            return produtos[i];
        }
    }
    return false;
}

function atualizarProduto (id,body) { 
    const produto = obterProduto(id);
    if (!produto) {
        return false;
    }

    else {
        const index = produtos.indexOf(produto);
        if (!body.nome && !body.quantidade && !body.valor && !body.peso && !body.estoqueMax) {
            return null;
        }

        if (body.nome) {
            produtos[index].nome = body.nome;
        }

        if (body.quantidade) {
            produtos[index].quantidade = body.quantidade;
            produtos[index].estoqueMax = body.quantidade;
        }

        if (body.valor) {
            produtos[index].valor = body.valor;
        }

        if (body.peso) {
            produtos[index].peso = body.peso;
        }

        if (body.estoqueMax) {
            produtos[index].estoqueMax = body.estoqueMax;
        }

        return produtos[index];

    }
}

function deletarProduto (id) {
    const produto = obterProduto(id);
    if (!produto) {
        return false;
    }

    else {
        const index = produtos.indexOf(produto);
        produtos[index].deletado = true;
        return produto;
    }
}

function novoPedido (body) { //Pedido Adicionado em formato de Array (permite add simultâneas)
    let count = 0;
    let estado = "incompleto";
    if (body.length == undefined) {
        return null;
    }

    for (let i = 0; i < body.length; i++) {
        if (typeof(body[i].id) == "number" && body[i].idCliente) {
            let pedido = obterPedido(body[i].id);
            if (pedido != false) {
                if (count >= 1) {
                    pedidos.splice(-count);
                }
                return false;
            }

            else {  //Primeiro é aberto a requisição do pedido para depois adicionar produtos       
                let objetoPedido = {
                    id: body[i].id, //Necessário passar o id do pedido
                    produtos: [],
                    estado: estado,
                    idCliente: body[i].idCliente, // CPF
                    valorTotal: 0,
                    deletado: false,
                }
                pedidos.push(objetoPedido);
                count++;
                estado = "incompleto";
                valorTotal = 0;
            } 
        }

        else {
            pedidos.splice(-count);
            return null;
        }  
    }
    return pedidos.slice(-count);
}

function contabilizarPedido (ctx,id) {
    const pedido = obterPedido(id);
    if (!pedido) {
        erro(ctx,404,"Pedido não encontrado")
        return false;
    }

    else {
        const index = pedidos.indexOf(pedido);
        let valorTotal = 0;
        if (pedido.produtos) {
            pedido.produtos.forEach(item => {
                valorTotal += item.valor * item.quantidade;
            })
            pedidos[index].valorTotal = valorTotal;
            return pedidos[index];
        }   
    }
}

function alterarQuantidadeProduto (id,quantidade,add_remover) {
    const produto = obterProduto(id);
    if (!produto) {
        return false;
    }

    else {
        const index = produtos.indexOf(produto);
        if (quantidade) {
            if (add_remover == "+") {
                produtos[index].quantidade += quantidade;
            }

            else {
                produtos[index].quantidade -= quantidade;
            }
        }
    }

}

function obterPedido (id) {
    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id == id && !pedidos[i].deletado) {
            return pedidos[i];
        }
    }
    return false;
}

function obterPedidoStatus (estado) { //estregues - pagos - processando - cancelados
    let listaPedidos = [];
    for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].estado == estado) {
            listaPedidos.push(pedidos[i]);
        }
    }

    if (listaPedidos.length >= 1) {
        return listaPedidos;
    }

    else {
        return false;
    }
    
}

function atualizarQuantidadeProdutoAdd (idPedido,idProduto,body,ctx) {
    const pedido = obterPedido(idPedido);
    const produto = obterProduto(idProduto);
    if (!pedido || !produto) {
        return null;
    }

    let indexPedido = pedidos.indexOf(pedido);
    let indexProduto = produtos.indexOf(produto);
   
    if (typeof(body.quantidade) == "number") { 
        for (let i = 0; i < pedidos[indexPedido].produtos.length; i++) {
            if (pedidos[indexPedido].produtos[i].id == idProduto && pedidos[indexPedido].estado == "incompleto") {
                if (produtos[indexProduto].estoqueMax >= body.quantidade) {
                    pedidos[indexPedido].produtos[i].quantidade = body.quantidade;
                    contabilizarPedido(ctx,idPedido);
                    if (body.quantidade == 0) {
                        pedidos[indexPedido].produtos.splice(i,1);
                    }
                    return pedidos[indexPedido];
                }
            }
            
        }
        return null;
    }

    else {
        return false;
    }
       
}

function obterPedidos () {
    const pedidosAtivos = pedidos.filter((item)=> !item.deletado);
    if (pedidosAtivos.length >= 1) {
        return pedidosAtivos;
    }

    else {
        return false;
    }
}

function modificarPedido (id,body,ctx) {
    const pedido = obterPedido(id);
    const index = pedidos.indexOf(pedido);
    if (!pedido) {
        return null;
    }

    else if (body != undefined) {
        if (body.estado && body.estado != "incompleto") {
            if (pedidos[index].produtos.length != 0) {
                pedidos[index].estado = body.estado;
                for (let x = 0; x < pedidos[index].produtos.length; x++) {
                        alterarQuantidadeProduto(pedidos[index].produtos[x].id,pedidos[index].produtos[x].quantidade,"-");
                }
                return pedidos[index];
            }
            return false;
        }

        else if (obterProduto(body.id) && body.quantidade && pedidos[index].estado == "incompleto") { 
            const produto = obterProduto(body.id);
            const indexProduto = produtos.indexOf(produto);
            if (!produto) {
                return null;
            }

            body.valor = body.valor * 100;
            if (pedidos[index].produtos.length >= 1) {
                for (let i = 0; i < pedidos[index].produtos.length; i++) {
                    if (pedidos[index].produtos[i].id == body.id && produtos[indexProduto].quantidade >= pedidos[index].produtos[i].quantidade && body.quantidade >= 0) {
                        pedidos[index].produtos[i].quantidade += body.quantidade;
                        contabilizarPedido(ctx,id);
                        return pedidos[index];
                    }
                }
                if (produtos[indexProduto].quantidade >= body.quantidade && body.quantidade >= 0) {
                    pedidos[index].produtos.push({["nome"]: produtos[indexProduto].nome, ["id"]: body.id,["quantidade"]: body.quantidade, ["valor"]: produtos[indexProduto].valor});
                    contabilizarPedido(ctx,id);
                    return pedidos[index];
                }

                else {
                    return false;
                }
            }

            else {
                if (produtos[indexProduto].quantidade >= body.quantidade && body.quantidade >= 0) {
                    pedidos[index].produtos.push({["nome"]: produtos[indexProduto].nome, ["id"]: body.id,["quantidade"]: body.quantidade, ["valor"]: produtos[indexProduto].valor});
                    contabilizarPedido(ctx,id);
                    return pedidos[index];
                }

                else {
                    return false;
                }
                
            }
            
        }

        else {
            return null;
        }
    }

    else {
        return false;
    }
}

function deletarPedido (id) {
    const pedido = obterPedido(id);
    if (!pedido) {
        return null;
    }

    else {
        const index = pedidos.indexOf(pedido);
        pedidos[index].deletado = true;
        pedidos[index].estado = "cancelado";
        pedidos[index].produtos.forEach((item,i) => {
           let produto = obterProduto(item.id);
           let index = produtos.indexOf(produto);
           produtos[index].quantidade += pedidos[index].produtos[i].quantidade;
        });
        return pedidos[index];
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

function sucesso (ctx,status,mensagem) {
    ctx.status = status;
    ctx.body = {
        status: "sucesso",
        dados: mensagem,
    }
}
server.use(contexto);
server.listen(8081,() => console.log("Servidor Online"))