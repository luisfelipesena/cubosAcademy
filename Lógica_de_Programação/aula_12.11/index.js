const { pessoas } = require("./pessoas");

// Questão 1 - Cor dos Olhos

const corDosOlhos = new Set();

for (const pessoa of pessoas) {
  corDosOlhos.add(pessoa.corDosOlhos);
}

console.log([...corDosOlhos]);

// Questão 2 - Acesso Rápido a lista de pessoas baseada na cor dos olhos
// Como a leitura será muito mais importante que a escrita, torna-se mais fácil a indexação
// Key = Cor Dos Olhos

const pessoasIndexados = [];

for (const pessoa of pessoas) {
  pessoasIndexados[pessoa.corDosOlhos]
    ? pessoasIndexados[pessoa.corDosOlhos].push(pessoa)
    : (pessoasIndexados[pessoa.corDosOlhos] = [pessoa]);
}

console.log(pessoasIndexados["blue"]);

// OU

const indexacao = new Map();

for (const pessoa of pessoas) {
  indexacao.set(
    pessoa.corDosOlhos,
    pessoas.filter((p) => p.corDosOlhos == pessoa.corDosOlhos)
  );
}

console.log(indexacao.get("green"));
