const chalk = require("chalk");
const numerais = require("./numerais");

const transformarNumero = (numero) => {
    if (numerais.isEven(numero) === true) {
        return chalk.blue("É Par");
    }

    else if (numerais.isOdd(numero) === true) {
        return chalk.red(`É Ímpar`);
    }
}

console.log(transformarNumero(3));