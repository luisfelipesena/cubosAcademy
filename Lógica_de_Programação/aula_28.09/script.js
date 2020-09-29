//Exercícios Propostos
//Questão 1
const array = [
  "Alo alo",
  "Prazer estamos vivenciando uma nova era",
  "Hello World",
  "BBMP",
];

const encontrado = array.find((item) => item.length > 10);
console.log(encontrado);

//Questão 2
const texto = `Ola
Tudo bem com vc?
Estou por aqui qualquer coisa`;

const textoArray = texto.split("");
const indices = [];
let indexQuebrasLinha = 0;
while (indexQuebrasLinha !== -1) {
  indexQuebrasLinha = textoArray.findIndex((item) => item === "\n");
  if (indexQuebrasLinha !== -1) {
    indices.push(indexQuebrasLinha);
    textoArray.splice(indexQuebrasLinha, 1);
  }
} //indexof("/n");

console.log(indices);

//Questão 3
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const par = array.some((item) => item % 2 === 0);
console.log(par);

//Questão 4
const array = [1, 2, 3, 4, 5, 6, 15, 16, 35, 36];

const possuiQuadradoPerfeito = (numeros) => {
  const quadradoPerfeito = numeros.some((item) => {
    if (
      item > 0 &&
      Math.sqrt(item) > 0 &&
      Math.pow(Math.sqrt(item), 2) === item &&
      !Math.sqrt(item).toString().includes(".")
    ) {
      return true;
    }
  });
  return quadradoPerfeito;
};

console.log(possuiQuadradoPerfeito(array));

//Questão 4 - método 2
const array = [3, 4, 5];
const possuiQuadradoPerfeito = (numeros) => {
  const quadradoPerfeito = numeros.some((item) => {
    for (let i = 0; i < item; i++) {
      if (item === i * i) {
        return true;
      }
    }
  });
  return quadradoPerfeito;
};

console.log(possuiQuadradoPerfeito(array));

//Questão 5
const array = [50, 4000, 5000, 7000, 9000, 100];
const centavos = array.every((item) => item > 0 && Math.floor(item) === item);
console.log(centavos);
