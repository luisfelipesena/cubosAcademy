//Questão 1 - Ordenando Decrescentemente
// const arr = [1, 34, 10, 5, 100, 2];
// arr.sort((a, b) => b - a);
// console.log(arr);

//Questão 2 - Ordenando alfabéticamente
// const nomes = ["ana", "Junior", "pedro", "Cláudia", "Adriana"];

// console.log(nomesFormatados.sort());

//Questão 3.1 - Ordenando alfabeticamente nomes com acento
// const nomes = ["ana", "Junior", "pedro", "Cláudia", "Adriana", "Álvaro"];
// nomes.sort((a, b) => a.localeCompare(b));
// console.log(nomes);

//Questão 3.2 - Orden Alfabética reversa
// const nomes = ["ana", "Junior", "pedro", "Cláudia", "Adriana", "Álvaro"];
// nomes.sort((a, b) => b.localeCompare(a));
// console.log(nomes);

//Questão 4 - Ordenar array de objetos
// const pessoas = [
//   {
//     nome: "Diego",
//     idade: 57,
//   },
//   {
//     nome: "Rogério",
//     idade: 25,
//   },
//   {
//     nome: "Rildo",
//     idade: 25,
//   },
//   {
//     nome: "Diego",
//     idade: 25,
//   },
//   {
//     nome: "José",
//     idade: 48,
//   },
// ];

// pessoas.sort((a, b) => {
//   if (a.idade < b.idade) {
//     return -1;
//   } else if (a.idade > b.idade) {
//     return 1;
//   } else {
//     return a.nome.localeCompare(b.nome);
//   }
// });
// console.log(pessoas);
