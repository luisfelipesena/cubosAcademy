const milissegundos = 3000;

const promessa = (milissegundos) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(undefined);
        },milissegundos)
    })
    .then(valor => {
        console.log(valor);
    })
}

promessa(milissegundos);
console.log(`Promessa em ${milissegundos} milissegundos:`);
