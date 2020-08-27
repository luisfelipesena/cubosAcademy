const bancos = [
    {
        nome: "Banco do Brasil S.A.",
        id: "001"
    },
    {
        nome: "Banco Santander (Brasil) S.A.",
        id: "033"
    },
    {
        nome: "Caixa Econômica Federal",
        id: "104"
    },
    {
        nome: "Banco Bradesco S.A.",
        id: "237"	
    },
    {
        nome: "Banco Itaú S.A.",
        id: "341"	
    },
    {
        nome: "Banco Real S.A. (antigo)",
        id: "356"
    },
    {
        nome: "Banco Mercantil do Brasil S.A.",
        id: "389"
    },
    {
        nome: "HSBC Bank Brasil S.A.",
        id: "399"
    },
    {
        nome: "Banco Safra S.A.",
        id: "422"
    },
    {
        nome: "Banco Rural S.A.",
        id: "453"	
    },
    {
        nome: "Banco Rendimento S.A.",
        id: "633"
    },
    {
        nome: "Itaú Unibanco Holding S.A.",
        id: "652"
    },
    {
        nome: "Banco Citibank S.A.",
        id: "745"
    },
]

const nomeBanco = (idBanco) => {
    for (let i = 0; i < bancos.length; i++) {
        let nomeDoBanco = bancos[i].nome;
        if (bancos[i].id == idBanco) {
            return (nomeDoBanco.replace(/(?:\(Brasil\)|S.A.|\(antigo\)|Holding)/gm,""));
        }
    }
    return null;
}

const retirarCaracteresNaoNumerais = (string) => {
    string = string.toString();
    string = (string.trim()).replace(/[.()-]|[A-Z]|[a-z]/g, '');
    return string;
}

const cpf = (cpf) => {
    cpf = cpf.toString();
    if (cpf.trim().length == 11) {
        let cpfModificado1 = [cpf.slice(0,3),cpf.slice(3,6),cpf.slice(6,9)];
        cpfModificado1 = cpfModificado1.join(".");
        let cpfModificadoFinal = [cpfModificado1,cpf.slice(9)];
        cpfModificadoFinal = cpfModificadoFinal.join("-");
        return cpfModificadoFinal;
    }

    else {
        return null;
    }
}

const idBanco = (idBanco) => {
    idBanco = idBanco.toString();
    if (idBanco.trim().length == 3) {
        return idBanco;
    }

    else {
        return null;
    }
}

//Num Final = Número Formatado nos Padrões

const agencia = (numAgencia) => {
    numAgencia = numAgencia.toString();
    if (numAgencia.trim().length == 5) {
        let num1 = [numAgencia.slice(0,4)];
        let numFinal = [num1,numAgencia.slice(-1)];
        numFinal = numFinal.join("-");
        return numFinal;
    }

    else {
        return null;
    }
}

const contaCorrente = (numConta) => {
    numConta = numConta.toString();
    if (numConta.trim().length == 7) {
        let num1 = [numConta.slice(0,6)];
        let numFinal = [num1,numConta.slice(-1)];
        numFinal = numFinal.join("-");
        return numFinal;
    }

    else {
        return null;
    }
}

module.exports = {
    nomeBanco: nomeBanco,
    retirarCaracteresNaoNumerais: retirarCaracteresNaoNumerais,
    cpf: cpf,
    idBanco: idBanco,
    agencia: agencia,
    contaCorrente: contaCorrente
};