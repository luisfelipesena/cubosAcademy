## Questã0 01 - Dada uma determinada lutadora de UFC, faça um programa que determine a qual categoria da competição ele pertence.
const lutadora = {
nome: "Amanda Nunes",
massa: 100, //em kg
altura: 173, //em cm
arteMarcial: "Jiu-jitsu",
genero: "F"
};

if (lutadora.massa <= 52.2)
{
  console.log("categoria: Peso Palha");
}

else if (lutadora.massa > 52.2 && lutadora.massa <= 56.7)
{
  console.log("categoria: Peso Mosca");
}

else if (lutadora.massa > 56.7 && lutadora.massa <= 61.2)
{
  console.log("categoria: Peso Galo");
}

else if (lutadora.massa > 61.2 && lutadora.massa <= 65.8)
{
  console.log("categoria: Peso Pena");
}

else if (lutadora.massa > 65.8 && lutadora.massa <= 70.3)
{
  console.log("categoria: Peso Leve");
}

else if (lutadora.massa > 70.3 && lutadora.massa <= 77.1)
{
  console.log("categoria: Peso Meio-Médio");
}

else if (lutadora.massa > 77.1 && lutadora.massa <= 83.9)
{
  console.log("categoria: Peso Médio");
}

else if (lutadora.massa > 83.9 && lutadora.massa <= 93)
{
  console.log("categoria: Peso Meio-Pesado");
}

else if (lutadora.massa > 93 && lutadora.massa <= 120.2)
{
  console.log("categoria: Peso Pesado");
}

## Questão 2 - O índice de massa corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. O IMC é a razão entre a massa de uma pessoa, em quilogramas e o quadrado da sua altura, em metros. Faça um programa que imprima na tela o IMC de uma pessoa, cujo objeto representativo segue o seguinte modelo:
const pessoa = {
nome: "Jose",
massa: 60, //em kg
altura: 173 //em centímetros
}

console.log(pessoa.massa / ((pessoa.altura/100)*(pessoa.altura/100))

## Questão 3 - Com base na questão anterior, avalie a pessoa de acordo com a tabela abaixo e o IMC dela e imprima a classificação dela na tela.
const pessoa = {
nome: "Jose",
massa: 60, //em kg
altura: 173 //em centímetros
}

let imc = pessoa.massa / ((pessoa.altura/100)*(pessoa.altura/100))

if(imc < 18.5)
{
  console.log(`imc de ${imc}, Magreza`);
}

else if (imc >= 18.5 && imc <= 24.9)
{
  console.log(`imc de ${imc}, Normal`);
}

else if (imc >=25 && imc <= 29.9)
{
  console.log(`imc de ${imc}, Sobrepeso`);
}

else if (imc >= 30 && imc <= 39.9)
{
  console.log(`imc de ${imc}, Obesidade`);
}

else 
{
  console.log(`imc de ${imc}, Obesidade Grave`);
}

## Questão 4 - Uma equação de segundo grau possui sempre 3 coeficientes: A, B e C. Para saber se a equação possui raízes reais, calcula-se o valor de delta.
const equacao1 = {
a: 1,
b: -5,
c: 6
}; // 2 raízes distintas: 2 e 3

const equacao2 = {
a: 1,
b: -4,
c: 4
}; // 2 raízes iguais a 2

const equacao3 = {
a: 1,
b: 0,
c: 4
};// Não possui raízes reais

let delta1 = (equacao1.b)*(equacao1.b) - (4*(equacao1.a)*(equacao1.c));
let x11 =(-(equacao1.b) + Math.sqrt(delta1))/ 2*(equacao1.a);
let x12 =(-(equacao1.b) - Math.sqrt(delta1))/ 2*(equacao1.a);

if (delta1 < 0)
{
  console.log("1 - Não possui Raízes Reais");
}

else if (delta1 === 0)
{
  console.log(`1 - Possui 2 Raízes Reais e Iguais: ${x11}`);
}

else if (delta1 > 0)
{
  console.log(`1- Possui 2 Raízes Reais e Distintas: ${x11} e ${x12}`);
}

let delta2 = (equacao2.b)*(equacao2.b) - (4*(equacao2.a)*(equacao2.c));
let x21 =(-(equacao2.b) + Math.sqrt(delta2))/ 2*(equacao2.a);
let x22 =(-(equacao2.b) - Math.sqrt(delta2))/ 2*(equacao2.a);

if (delta2 < 0)
{
  console.log("2 - Não possui Raízes Reais");
}

else if (delta2 === 0)
{
  console.log(`2 - Possui 2 Raízes Reais e Iguais: ${x21}`);
}

else if (delta2 > 0)
{
  console.log(`2- Possui 2 Raízes Reais e Distintas: ${x21} e ${x22}`);
}

let delta3 = (equacao3.b)*(equacao3.b) - (4*(equacao3.a)*(equacao3.c));
let x31 =(-(equacao3.b) + Math.sqrt(delta3))/ 2*(equacao3.a);
let x32 =(-(equacao3.b) - Math.sqrt(delta3))/ 2*(equacao3.a);

if (delta3 < 0)
{
  console.log("3 - Não possui Raízes Reais");
}

else if (delta3 === 0)
{
  console.log(`3 - Possui 2 Raízes Reais e Iguais: ${x31}`);
}

else if (delta3 > 0)
{
  console.log(`3 - Possui 2 Raízes Reais e Distintas: ${x31} e ${x32}`);
}

## Questã0 5 - Dadas as medidas dos 3 lados de um possível triângulo é possível descobrir se de fato é possível fazer um triângulo com essas medidas. Isso é chamado de condição de existência de um triângulo. Um triângulo pode existir apenas quando o seu maior lado é menor que a soma de seus dois outros lados. Faça um programa que descubra se um possível triângulo existe ou não.
const triangulo1 = {
a: 1,
b: 2,
c: 3
};

const triangulo2 = {
a: 3,
b: 20,
c: 4
};

const triangulo3 = {
a: 12,
b: 2,
c: 13
};

let temp1;
let temp2;
let temp3;

if (triangulo1.a > triangulo1.c)
{
  temp1 = triangulo1.a ;
  triangulo1.a = triangulo1.c;
  triangulo1.c = temp1;
}
else if (triangulo1.b > triangulo1.c)
{
  temp1 = triangulo1.b;
  triangulo1.b = triangulo1.c;
  triangulo1.c = temp1;
}

if (triangulo2.a > triangulo2.c)
{
  temp2 = triangulo1.a ;
  triangulo2.a = triangulo2.c;
  triangulo2.c = temp2;
}
else if (triangulo2.b > triangulo2.c)
{
  temp2 = triangulo2.b;
  triangulo2.b = triangulo2.c;
  triangulo2.c = temp2;
}

if (triangulo3.a > triangulo3.c)
{
  temp3 = triangulo3.a ;
  triangulo3.a = triangulo3.c;
  triangulo3.c = temp3;
}
else if (triangulo3.b > triangulo3.c)
{
  temp3 = triangulo3.b;
  triangulo3.b = triangulo3.c;
  triangulo3.c = temp3;
}

if (triangulo1.c < triangulo1.a + triangulo1.b)
{
  console.log ("triangulo1 existe");
}
else
{
  console.log ("triangulo1 não existe");
}

if (triangulo2.c < triangulo2.a + triangulo2.b)
{
  console.log ("triangulo2 existe");
}
else
{
  console.log ("triangulo2 não existe");
}

if (triangulo3.c < triangulo3.a + triangulo3.b)
{
  console.log ("triangulo3 existe");
}
else
{
  console.log ("triangulo3 não existe");
}

## Questão 6 - Levando em conta a 5, classificar de acordo com os lados
const triangulo1 = {
a: 5,
b: 5,
c: 5
};

const triangulo2 = {
a: 3,
b: 3,
c: 3
};

const triangulo3 = {
a: 12,
b: 24,
c: 11
};

let temp1;
let temp2;
let temp3;

if (triangulo1.a > triangulo1.c)
{
  temp1 = triangulo1.a ;
  triangulo1.a = triangulo1.c;
  triangulo1.c = temp1;
}
else if (triangulo1.b > triangulo1.c)
{
  temp1 = triangulo1.b;
  triangulo1.b = triangulo1.c;
  triangulo1.c = temp1;
}

if (triangulo2.a > triangulo2.c)
{
  temp2 = triangulo1.a ;
  triangulo2.a = triangulo2.c;
  triangulo2.c = temp2;
}
else if (triangulo2.b > triangulo2.c)
{
  temp2 = triangulo2.b;
  triangulo2.b = triangulo2.c;
  triangulo2.c = temp2;
}

if (triangulo3.a > triangulo3.c)
{
  temp3 = triangulo3.a ;
  triangulo3.a = triangulo3.c;
  triangulo3.c = temp3;
}
else if (triangulo3.b > triangulo3.c)
{
  temp3 = triangulo3.b;
  triangulo3.b = triangulo3.c;
  triangulo3.c = temp3;
}

if (triangulo1.c < triangulo1.a + triangulo1.b)
{
  if (triangulo1.c === triangulo1.b && triangulo1.b === triangulo1.a)
  {
    console.log ("1- Equilátero");
  }
  else if (triangulo1.c === triangulo1.b || triangulo1.a === triangulo1.b || triangulo1.a === triangulo1.c)
  {
    console.log ("1- Isósceles");
  }
  else
  {
    console.log ("1- Escaleno");
  }
}
else
{
  console.log ("1- triangulo1 não existe");
}

if (triangulo2.c < triangulo2.a + triangulo2.b)
{
  if (triangulo2.c === triangulo2.b && triangulo2.b === triangulo2.a)
  {
    console.log ("2- Equilátero");
  }
  else if (triangulo2.c === triangulo2.b || triangulo2.a === triangulo2.b || triangulo2.a === triangulo2.c)
  {
    console.log ("2- Isósceles");
  }
  else
  {
    console.log ("2- Escaleno");
  }
}
else
{
  console.log ("triangulo2 não existe");
}

if (triangulo3.c < triangulo3.a + triangulo3.b)
{
  if (triangulo3.c === triangulo3.b && triangulo3.b === triangulo3.a)
  {
    console.log ("3- Equilátero");
  }
  else if (triangulo3.c === triangulo3.b || triangulo3.a === triangulo3.b || triangulo3.a === triangulo3.c)
  {
    console.log ("3- Isósceles");
  }
  else
  {
    console.log ("3- Escaleno");
  }
}
else
{
  console.log ("3- triangulo3 não existe");
}

## Questão 7 - Um determinado remédio pode ser ministrado da seguinte maneira:
## Crianças menores de 12 anos não podem tomar
## Jovens de 12 a 18 anos tomam apenas uma gota por dia
## Para adultos a regra difere entre homens e mulheres:
#### Homens tomam apenas uma gota para cada 10kg de massa que possuem.
#### Mulheres tomam duas gotas para cada 10kg de massa que possuem.
## Pessoas acima de 65 anos são consideradas idosas, e não seguem a regra dos adultos. Elas tomam uma gota para cada 20kg de massa que possuem independente do gênero. Caso possuam colesterol acima de 160, não podem tomar.
## Faça uma programa que calcule como uma pessoa deve tomar o remédio, caso possa.
const pessoa = {
nome: "Pedro",
massa: 59, //em kg
altura: 173, //em cm
idade: 35,
colesterol: 120,
genero: "M"
}

if (pessoa.idade < 12)
{
  console.log("Não é indicado para menores de 12 anos");
}

if (pessoa.idade >= 12 && pessoa.idade <= 18)
{
  console.log ("Recomendado: 1 gota por dia");
}

else if (pessoa.idade > 18 && pessoa.idade <= 65)
{
  if (pessoa.genero == 'M')
  {
    console.log (`Recomendado: ${Math.trunc(pessoa.massa / 10)} gotas por dia`);
  }

  else
  {
    console.log (`Recomendado: ${Math.trunc(2 * (pessoa.massa / 10))} gotas por dia`);
  }
}

else
{
  if (pessoa.colesterol > 160)
  {
    console.log ("Colesterol muito alto, não pode tomar");
  }

  else
  {
    console.log (`Recomendado: ${pessoa.massa / 20}`);
  }
}

## Questão 8 - Na Libertadores da América de futebol, cada fase eliminatória é decidida com dois confrontos entre os dois mesmos times. Em cada um deles, um dos dois times joga em casa (em seu próprio estádio). O time classificado em cada fase é aquele que fizer mais gols somando as duas partidas. Caso haja empate nesse critério, passa o time que fez mais gols fora de casa. Caso também haja empate nesse critério, a decisão vai pros pênaltis. Dados os resultados de uma determinada fase, faça um programa que indique qual time passou para a próxima fase da competição ou se a decisão será nos pênaltis. Ao exibir o resultado, informe o placar agregado (somado) e se foi utilizado o critério de desempate (e quantos gols fora de casa foram feitos nesse caso).
const semifinal = {
  jogo1: {
    casa: {
      time: "Grêmio",
      gols: 1
    },
    visitante: {
      time: "Flamengo",
      gols: 1
    }
  },
  jogo2: {
    casa: {
      time: "Flamengo",
      gols: 5
    },
    visitante: {
      time: "Grêmio",
      gols: 0
    }
  }
};

let golsTime1 = semifinal.jogo1.casa.gols + semifinal.jogo2.visitante.gols
let golsTime2 = semifinal.jogo1.visitante.gols + semifinal.jogo2.casa.gols

if (golsTime1 > golsTime2)
{
  console.log (`${semifinal.jogo1.casa.time} classificado por ${golsTime1} x ${golsTime2} no agregado`);
}

else if (golsTime2 > golsTime1)
{
  console.log (`${semifinal.jogo1.visitante.time} classificado por ${golsTime2} x ${golsTime1} no agregado`);
}

else
{
  if (semifinal.jogo1.visitante.gols > semifinal.jogo2.visitante.gols)
  {
    console.log (`${semifinal.jogo1.visitante.time} classificado por critério de desempate`);
  }

  else if (semifinal.jogo1.visitante.gols < semifinal.jogo2.visitante.gols)
  {
    console.log (`${semifinal.jogo1.casa.time} classificado por critério de desempate`);
  }
  else 
  {
    console.log("Decisão nos Pênaltis");
  }
}
