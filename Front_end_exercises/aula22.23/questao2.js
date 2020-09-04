const promessa = (segundos) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(undefined);
        },segundos * 1_000)
    })
}

promessa(1).then(valor => {
    console.log(valor);
})

console.log("Promessa em 1s:");
