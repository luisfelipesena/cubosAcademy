let numeros = [1,5,40,20,70];

//CLASSE
//Questão 1
console.log("Questão 1");
for (const item of numeros) {
    console.log(item);
}
console.log();

//Questão 2
console.log("Questão 2");
for (const item of numeros) {
    if (item > 10) {
        console.log(item);
    }
}
console.log();

//Questão 3
console.log("Questão 3");
numeros.forEach(item => console.log(item));
console.log();

//Questão 4
console.log("Questão 4");
numeros.forEach((item,i) => console.log(`índice: ${i} para o item: ${item}`));
console.log();

//Questão 5
//o argumento item é uma cópia dos itens do array números, já o argumento array não, ele possui uma ideia próxima a de um ponteiro, modificando no local onde a info está armazenada na memória (&)
console.log("Questão 5");
numeros.forEach((item,i,array) => {
    array[i] *= 2;
});
console.log(numeros);
console.log();

//CASA
//Questão 6
console.log("Questão 6");
let arrayObjetos = [
    {
        time1: 3,
        time2: 2
    },
    {
        time1: 6,
        time2: 2
    },
    {
        time1: 3,
        time2: 3
    },
    {
        time1: 1,
        time2: 2
    },
    {
        time1: 0,
        time2: 0
    },
    {
        time1: 0,
        time2: 0
    }
];
let vitoriaTime1 = 0;
let vitoriaTime2 = 0;
let empates = 0;
arrayObjetos.forEach(item => {
    if (item.time1 > item.time2) {
        vitoriaTime1++;
    }

    else if (item.time1 < item.time2) {
        vitoriaTime2++
    }

    else {
        empates++;
    }
});

console.log(`Tiveram ${vitoriaTime1} vitórias do time 1\n${vitoriaTime2} vitórias do time 2 \ne ${empates} empates`);
console.log();

//Questão 7 (complementando a 6)
console.log("Questão 7");
let pontosTime1 = vitoriaTime1 * 3 + empates;
let pontosTime2 = vitoriaTime2 * 3 + empates;
console.log(`${pontosTime1} Pontos do time 1\n${pontosTime2} Pontos do time 2`);
console.log();

//Questão 8
console.log("Questão 8");
let golsSofridos1 = 0;
let golsSofridos2 = 0;
arrayObjetos.forEach(item => {
    golsSofridos1 += item.time2;
    golsSofridos2 += item.time1;
});

console.log(`Time 1 sofreu: ${golsSofridos1} gols\nTime 2 sofreu: ${golsSofridos2} gols`);
console.log();

//Questão 9
console.log("Questão 9");
let partidas6 = 0;
arrayObjetos.forEach(item => {
    let golsTotal = item.time1 + item.time2;
    if (golsTotal > 6) {
        partidas6++;
    }
})
console.log(partidas6);
console.log();

//Questão 10
console.log("Questão 10");
let zeroAZero = [];
arrayObjetos.forEach((item,i) => {
    let totalDeGols = item.time1 + item.time2;
    if (totalDeGols == 0) {
        zeroAZero.push(i);
    }
});
console.log(`Não houve gols nas partidas de índice: ${zeroAZero.join(" e ")}`);