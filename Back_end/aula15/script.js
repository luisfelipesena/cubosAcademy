const chalk = require ("chalk");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//preco em centavos
const bebidas = [
    {
        id: 1,
        nome: "coca cola",
        preco: 500,
        quantidade: 1000
    },
    {
        id: 2,
        nome: "pepsi",
        preco: 300,
        quantidade: 2000
    },
    {
        id: 3,
        nome: "guaraná antartica",
        preco: 350,
        quantidade: 1500
    },
    {
        id: 4,
        nome: "itaipava",
        preco: 600,
        quantidade: 3000
    }
]

const buscarProduto = (bebida) => {
    for (let i = 0; i < bebidas.length; i++) {
        if (bebida === bebidas[i].nome) {
            return true;
        }
    }
    return false;
}

const encerrar = () => {
    console.log(chalk.green("Obrigado pela Preferência! "));
    rl.close();
}

const perguntaProduto = () => {
    rl.question("Qual Bebida você está procurando? ",condicoesBebida);
}

const condicoesBebida = (bebida) => {
    if (bebida == "000"){
        encerrar();
    }

    else if (buscarProduto(bebida)){
        console.log(chalk.blue(`Yay! Temos ${bebida}!`));
        perguntarQuantidade(bebida);
    }

    else if (!buscarProduto(bebida)) {
        console.log(chalk.red(`Ahh! Não Temos ${bebida}!`));
        perguntaProduto();
    } 
}

const perguntarQuantidade = (bebidaEscolhida) => {
    rl.question("Qual a quantidade? ", (quantidadeEscolhida) => {
        let quantidade;
        let bebida;
        for (let i = 0; i < bebidas.length; i++){
            if (bebidas[i].nome == bebidaEscolhida){
                bebida = bebidas[i];
                quantidade = bebidas[i].quantidade;
            }
        }

        if (quantidadeEscolhida >= 1 && quantidadeEscolhida <= quantidade){
            console.log(chalk.yellow("Beleza!! Temos essa quantidade no nosso estoque "));
            compraFinal(quantidadeEscolhida,bebida);
        }

        else {
            perguntarSemEstoque(quantidade,quantidadeEscolhida,bebida);
        }

    });
}

const perguntarSemEstoque = (quantidadeReal,quantidadeEscolhida,bebida) => {
    rl.question(chalk.red(`Não temos essa quantidade em estoque, o máximo é ${quantidadeReal} , deseja pegar essa quantia? `), (resposta) => {
        if (resposta == "sim"){
            quantidadeEscolhida = quantidadeReal;
            compraFinal(quantidadeEscolhida,bebida);
        }

        else {
            encerrar();
        }
    });
}

const compraFinal = (quantidadeEscolhida,bebida) => {
    console.log(chalk.green(`Valor Total: ${(bebida.preco/100) * quantidadeEscolhida}R$`));
    rl.question(`Deseja pagar agora? `, (resposta) => {

        if (resposta == "sim"){
            encerrar();
        }
        
        else {
            console.log(chalk.red("Não deixe de pagar na próxima compra ok? "));
            rl.close();
        }
    });
}


console.log("\nDigite 000 para encerrar o Atendimento... \n");
perguntaProduto();
