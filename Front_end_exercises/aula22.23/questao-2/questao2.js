const promessa = (segundos) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(undefined);
        },segundos * 1_000)
    })
    .then(valor => {
        console.log(valor);
    })
}

promessa(1);
console.log("Promessa em 1s:");

