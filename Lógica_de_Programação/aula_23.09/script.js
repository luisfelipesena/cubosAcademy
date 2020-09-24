//Questao 1 -
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e'];
const juncao = [...arr1,...arr2];
console.log(juncao);

//Questao 2 -
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e'];

const juncao = ['z',...arr1,'letras',...arr2,'f'];
console.log(juncao);

//Questão 3 - 
const carro = {
    modelo: "Gol",
    marca: "Volkswagen",
    cor: "Vermelho",
    potenciaCV: 80,
    preco: 3000000
};

let {preco, ...carroSemPreco} = carro;
console.log(carro);

//Questão 4 e 5 e 6- 
const ordenar = (...args) => {
    args.sort((a,b) => a - b);
    console.log(args);
}

let arrayInteiros = [-10, -4, 0, 50, 9];
ordenar(...arrayInteiros);