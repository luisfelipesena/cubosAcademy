const isOdd = (numero) => {
    if (typeof numero !== "number"){
        console.log("Erro: Não é um número !!!");
        return false;
    }

    if (numero % 2 !== 0){
        return true;
    }

    else {
        return false;
    }
}

const isEven = (numero) => {
    if (typeof numero !== "number"){
        console.log("Erro: Não é um número !!!");
        return false;
    }

    if (numero % 2 === 0){
        return true;
    }

    else {
        return false;
    }
}

console.log(isEven(2));

module.exports = {
    isOdd: isOdd,
    isEven : isEven,
};