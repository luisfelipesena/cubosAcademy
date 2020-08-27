const helpers = require("./helpers"); //Módulo com as funções de Suporte
const fs = require("fs"); //Para escrever um novo Arquivo

let registroMovimentacoes = []; //Array que guardará o registro de movimentações financeiras de certo correntista
const correntistas = []; //Array que guardará todos os objetos dos correntistas

//exemplos iniciais de correntistas que podem ser adicionados, utilizando as funções de suporte
correntistas.push (
    {
    nome: "José",
    cpf: helpers.cpf(helpers.retirarCaracteresNaoNumerais("66666666666")),
    idBanco: helpers.idBanco(helpers.retirarCaracteresNaoNumerais("033")),
    agencia: `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais("55555"))})`,
    contaCorrente: helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais("7777777")),
    saldo: 300000
    },
    {
    nome: "Elias",
    cpf: helpers.cpf(helpers.retirarCaracteresNaoNumerais("55555555555")),
    idBanco: helpers.idBanco(helpers.retirarCaracteresNaoNumerais("033")),
    agencia: `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais("55565"))})`,
    contaCorrente: helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais("7775577")),
    saldo: 20000
    },
    {
    nome: "José",
    cpf: helpers.cpf(helpers.retirarCaracteresNaoNumerais("66666666666")),
    idBanco: helpers.idBanco(helpers.retirarCaracteresNaoNumerais("001")),
    agencia: `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais("42565"))})`,
    contaCorrente: helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais("8075577")),
    saldo: 72450 
    }

);

//Função Opcional Caso Queira Imprimir dados de certo Correntista
const imprimirCorrentista = (correntista) => {
    console.log(`\nNome do Correntista: ${correntista.nome}`);
    console.log(`Cpf: ${correntista.cpf}`);
    console.log(`Banco: ${helpers.nomeBanco(correntista.idBanco)}`);
    console.log(`Id do Banco: ${correntista.idBanco}`);
    console.log(`Agência: ${correntista.agencia}`);
    console.log(`Conta corrente: ${correntista.contaCorrente}`);
    console.log(`Saldo: R$ ${(correntista.saldo / 100)}\n`);
}

//Função que analisa se já existe um correntista com esses dados, caso não, permite a criação de um novo
const analisarNovoCorrentista = (cpf,idBanco,agencia,contaCorrente) => {
    let correntista = {
        cpf: helpers.cpf(helpers.retirarCaracteresNaoNumerais(cpf)),
        idBanco: helpers.idBanco(helpers.retirarCaracteresNaoNumerais(idBanco)),
        agencia: `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais(agencia))})`,
        contaCorrente: helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais(contaCorrente))
    }

    for (let i = 0; i < correntistas.length; i++) {
        if (correntista.cpf == correntistas[i].cpf && 
            correntista.idBanco == correntistas[i].idBanco 
            && correntista.agencia == correntistas[i].agencia 
            && correntista.contaCorrente == correntistas[i].contaCorrente) {
                return true;
        }
    }
    return false;
}

//Função que procura se existe algum correntista com o cpf e id do Banco passado
const procurarCorrentista = (cpf,idBanco) => {
    for (let i = 0; i < correntistas.length; i++) {
        if (cpf == helpers.retirarCaracteresNaoNumerais(correntistas[i].cpf) &&
            idBanco == helpers.retirarCaracteresNaoNumerais(correntistas[i].idBanco)) {
                return correntistas[i];
        }
    }
    console.log("Não existe CPF cadastrado.");
    return false;
}

//Funçao que adiciona no array de correntistas um novo caso possua dados diferentes dos existentes
const addNovoCorrentista = (nome,cpf,idBanco,agencia,contaCorrente,saldo) => {
    if (!analisarNovoCorrentista(cpf,idBanco,agencia,contaCorrente)) {
        if (helpers.cpf(cpf)!= null && helpers.idBanco(idBanco) != null && 
            helpers.agencia(agencia) != null && helpers.contaCorrente(contaCorrente) != null) {   
                correntistas.push ({
                    nome: nome,
                    cpf: helpers.cpf(helpers.retirarCaracteresNaoNumerais(cpf)),
                    idBanco: helpers.idBanco(helpers.retirarCaracteresNaoNumerais(idBanco)),
                    agencia: `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais(agencia))})`,
                    contaCorrente: helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais(contaCorrente)),
                    saldo: saldo
                });
        }
                            
        else {
            console.log("Digite Dados Válidos");
            return false;
        }
                          
    }

    else  {
        console.log("CPF já cadastrado.");
        return false;
    }
                 
}

//Função que atualiza os dados de algum correntista, menos o saldo e id do Banco
const atualizarCorrentista = (cpf,idBanco,propriedade,valorPropriedade) => {
    if(!procurarCorrentista(cpf,idBanco)) {
        return false;
    }

    else {
        let correntista = procurarCorrentista(cpf,idBanco);
        if (propriedade.includes("saldo") || propriedade.includes("idBanco")) {
                console.log("Não pode editar essa propriedade");
        }

        else {
            if ((propriedade == "nome" &&valorPropriedade != null) || 
                helpers.cpf(valorPropriedade)!= null ||
                helpers.idBanco(valorPropriedade) != null || 
                helpers.agencia(valorPropriedade) != null ||
                helpers.contaCorrente(valorPropriedade) != null) {
                    if (propriedade.includes("nome")){
                        correntista.nome = valorPropriedade;
                    }

                    else if (propriedade.includes("cpf")) {
                        correntista.cpf = helpers.cpf(helpers.retirarCaracteresNaoNumerais(valorPropriedade));
                    }

                    else if (propriedade.includes("agencia")) {
                        correntista.agencia = `(${helpers.agencia(helpers.retirarCaracteresNaoNumerais(valorPropriedade))})`;
                    }
                    
                    else if (propriedade.includes("contaCorrente")) {
                        correntista.contaCorrente = helpers.contaCorrente(helpers.retirarCaracteresNaoNumerais(valorPropriedade));
                    }

                    else {
                        console.log("Digite uma Propriedade Válida");
                        return false;
                    }
            }

            else {
                console.log("Digite Dados Válidos");
                return false;
            }
        }
    }
}

//Função que apaga os registros de algum correntista caso exista
const removerCorrentista = (cpf,idBanco) => {
    if(!procurarCorrentista(cpf,idBanco)) {
        return false;
    }

    else {
        let correntista = procurarCorrentista(cpf,idBanco);
        let indexCorrentista = correntistas.indexOf(correntista);
        correntistas.splice(indexCorrentista,1);
    }
}

//Função que serve para depósito e qualquer entrada de dinheiro de um certo correntista existente e add a movimentação ao array
const addDepositoCorrentista = (cpf,idBanco,valorASerDepositado) => {
    if(!procurarCorrentista(cpf,idBanco)) {
        return false;
    }

    else {
        let correntista = procurarCorrentista(cpf,idBanco);
        correntista.saldo += (valorASerDepositado * 100);
        registroMovimentacoes.push({
            transacao: "Realizada",
            cpf: cpf,
            idBanco: idBanco,
            tipo: "entrada",
            data: new Date(),
            valor: valorASerDepositado
        });
    }
}

//Função que serve para saque e qualquer retiradas de dinheiro de um certo correntista e add a movimentação ao array
const removerDepositoCorrentista = (cpf,idBanco,valorASerRetirado) => {
    if(!procurarCorrentista(cpf,idBanco)) {
        rl.close();
        return false;
    }

    else {
        let correntista = procurarCorrentista(cpf,idBanco);
        if (correntista.saldo >= valorASerRetirado * 100) {
            correntista.saldo -= (valorASerRetirado * 100);
            registroMovimentacoes.push({
                transacao: "Realizada",
                cpf: cpf,
                idBanco: idBanco,
                tipo: "saída",
                data: new Date(),
                valor: valorASerRetirado
            });
        }
        else {
            console.log("\nNão há saldo suficiente");
            registroMovimentacoes.push({
                transacao: "Não Realizada",
                cpf: cpf,
                idBanco: idBanco,
                tipo: "entrada",
                data: new Date(),
                valor: valorASerRetirado
            });
            return false;
        }
    }
}

//Função que Transfere dinheiro entre Contas caso existam (utiliza 3 funções)
const depositoCorrentistas = (cpfPagador,idBancoPagador,cpfReceptor,idBancoReceptor,valorTransferido) => {
    if(!procurarCorrentista(cpfPagador,idBancoPagador) || !procurarCorrentista(cpfReceptor,idBancoReceptor)) {
        return false;
    }

    else {
        let correntistaPagador = procurarCorrentista(cpfPagador,idBancoPagador);
        let correntistaReceptor = procurarCorrentista(cpfReceptor,idBancoReceptor);
        removerDepositoCorrentista(cpfPagador,idBancoPagador,valorTransferido);
        addDepositoCorrentista(cpfReceptor,idBancoReceptor,valorTransferido);
        //se quiser imprimir os dados de quem pagou
        // imprimirCorrentista(correntistaPagador); 
        //se quiser imprimir os dados de quem recebeu
        // imprimirCorrentista(correntistaReceptor); 
    }
}

//Daqui pra baixo uma função estará diretamente ligada a outra

//Função que analisa as movimentações financeiras e a quantidade selecionada dessas de um correntista existente
const extratoCpf = (cpf,idBanco,quantidadeRegistros) => {
    let extratoUser = [];
    let movimentacoesSelecionadas = [];
    if(!procurarCorrentista(cpf,idBanco)) {
        return false;
    }

    else {
        registroMovimentacoes.forEach(item => {
            if (item.cpf == cpf && item.idBanco == idBanco) {
                extratoUser.push(`${item.transacao} | ${item.tipo} | ${item.data} | R$ ${item.valor},00`);
            }
        });
        
        for (let i = 0; i < quantidadeRegistros; i++) {
            movimentacoesSelecionadas.push(extratoUser[i]);
        };
        return [cpf,idBanco,movimentacoesSelecionadas];
    }
}

//Funcão que cria a frase que será impressa no arquivo extrato
const formatarExtrato = (funcaoExtrato) => {
    if (!funcaoExtrato) {
        console.log("Não há o que imprimir\n");
        return false;
    }

    else {
        let frase = "";
        let cpf = funcaoExtrato[0];
        let idBanco = funcaoExtrato[1];
        let correntista = procurarCorrentista(cpf,idBanco);
        let informacoes = funcaoExtrato[2];
        frase += (`|| ${helpers.nomeBanco(idBanco)}||\n`);
        frase += (`Extrato Bancário do ${correntista.nome}, CPF: ${correntista.cpf}\n`);
        frase += (`Agência: ${correntista.agencia} - Conta Corrente: ${correntista.contaCorrente}\n`);
        frase += ("---------------------------------------------\n");
        frase += ("|| Movimentações ||\n");
        frase += ("---------------------------------------------\n");
        frase += ("Transação | Tipo | Data da Ocorrência | Valor\n");
        frase += ("---------------------------------------------\n");
        informacoes.forEach((item,i) => {
            if (informacoes[i] == undefined) { //caso a quantidade de registros que o user pediu for maior que as existentes
                if (i == 0) {
                    return null;
                }

                else if (informacoes[i] == undefined) {
                    console.log("Quantidade de Registros maior que as existentes");
                    return false;
                }
            }
            frase += (`${informacoes[i]}\n`);
        });
        return [cpf,frase];
    }
}

//Função que escreve em um arquivo a quantidade de movimentações escolhidas pelo usuário
const novoArquivo = (formatarExtrato) => {
    if (formatarExtrato == null) {
        return null;
    }

    else {
        fs.writeFileSync(`${helpers.cpf(formatarExtrato[0])}_${Math.random().toFixed(2)}.txt`,formatarExtrato[1]);
        console.log(`Extrato: ${helpers.cpf(formatarExtrato[0])}_${Math.random().toFixed(2)}.txt Criado Com Sucesso`);
    }
}

//Exemplos De Teste das Funções
console.log(correntistas);
addNovoCorrentista("Luis Felipe","11111111111","033","77777","3333333",500000);
console.log(correntistas);
atualizarCorrentista("11111111111","033","nome","Luis Felipe Cordeiro Sena");
console.log(correntistas);
removerCorrentista("55555555555","033");
console.log(correntistas);
depositoCorrentistas("11111111111","033","66666666666","033",70);
depositoCorrentistas("11111111111","033","66666666666","001",70);
console.log(correntistas);
novoArquivo(formatarExtrato(extratoCpf("11111111111","033",2)));
