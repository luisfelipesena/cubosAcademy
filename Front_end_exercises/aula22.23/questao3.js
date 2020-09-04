const milissegundos = 3000;

const promessa = (milissegundos) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(undefined);
        },milissegundos)
    })
}

promessa(milissegundos).then(valor => {
    console.log(valor);
})

console.log(`Promessa em ${milissegundos} milissegundos:`);