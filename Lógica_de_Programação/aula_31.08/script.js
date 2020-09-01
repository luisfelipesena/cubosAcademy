const array = [-1,1,2,3,4,5];
const arrayStrings = ["João","Alice","Luis","Antonio"];

//CLASSE

//Questão 1
array.forEach(item => console.log(item));

//Questão 2
const novoArray = array.map(item => item * 5)
console.log(novoArray);

//Questão 3
const novoArrayStrings = arrayStrings.map(item => item.slice(0,-1) + item.slice(-1).toUpperCase())
console.log(novoArrayStrings);

//Questão 4
const novoArrayPositivo = array.filter(item => item >= 0)
console.log(novoArrayPositivo);

//Questão 5
const novoArrayPar = array.filter(item => item % 2 == 0)
console.log(novoArrayPar);

//Questão 6
const novoArrayStringsA = arrayStrings.filter(item => item.substr(0,1).toLowerCase() == "a")
console.log(novoArrayStringsA);

//CASA

//Questão 7 
const somaInteiros = array.reduce((acc,item) => acc + item)
console.log(somaInteiros);

//*Soma dos elementos + 3 
const somaInteirosMais3 = array.reduce((acc,item) => acc + item,3)
console.log(somaInteirosMais3);

//Questão 8
const novaString = arrayStrings.reduce((acc,item,i,array) => array.join(" , "),0)
console.log(novaString);

//Questão 9 
const maiorValorDoArray = array.reduce((acc,item) => (acc == null) ? item :(item > acc)? item :acc ,null)
console.log(maiorValorDoArray);

//Questão 10
const maiorString = arrayStrings.reduce((acc,item) => (acc == null) ? item :(item.length > acc.length)? item :acc ,null)
console.log(maiorString);