const Koa = require("koa");
const server = new Koa();

//Questão 1A
const maioridade = (idade) => (idade >= 18) ? true :false ;
console.log(maioridade(11));

//Questão 1B
const imprimirApelido = (nome) => (nome === 'Nícolas') ? 'ni-ni-co-co-la-las' :'pablito dos teclados';   
console.log(imprimirApelido('Pablo'));

//Questão 1B.2
const concederAcesso = (permitido) => {
    const acesso = (permitido) ? 'O acesso está permitido!' :'O acesso está negado!' ;
    console.log(acesso);
}
concederAcesso("SIM");

//Questão 1C
const escolherHeroina = (grupo) => {
    let heroina = (grupo == "marvel") ? 'Capitã Marvel' :'Mulher Maravilha' ;
    return heroina;
}
console.log(escolherHeroina("marvel"));

//Questão 1D.1
let primeiraVistoria = false;
let segundaVistoria = false;
const mensagemAcesso = primeiraVistoria ? "Acesso permitido!" : (segundaVistoria ? "Acesso permitido!" : "Acesso negado!");
console.log(mensagemAcesso);

//Questão 1D.2

const calcularIdade = (animal, idade) => {
    let idades = (animal == 'gato') ? ( (idade <= 1) ? 15 :(idade > 1 && idade <= 2)? 15 + 10 :15 + 10 + ((idade - 2) * 4) ) :(animal == "cachorro") ? (idade <= 1) ? 15 :15 + ((idade - 1) * 7) :idade;
    return idades;
}

//Questão 2 - Servidor Web
const contexto = (ctx) => {
    ctx.body = "Olá Mundo ?";
    let barras = ctx.originalUrl.split("/");

    if (ctx.originalUrl == '/cara_ou_coroa') {
        const cara_ou_coroa = (Math.floor(Math.random() * 100) <= 50)? 'cara' :'coroa';
        ctx.body = cara_ou_coroa;
    }
    
    else if (barras[1] == `raiz_quadrada`) {
        let numero = barras[2];
        const numeroFinal = (numero == null)? 'Você precisa passar um número na requisição!' :Math.sqrt(numero);
        ctx.body = numeroFinal;
    }

    else if (barras[1] === `divisao`) {
        let numero1 = barras[2]; 
        let numero2 = barras[3];
        if (numero1 == null || numero2 == null) {
            ctx.body = 'Você precisa passar dois números na requisição!';
        }

        else {
            ctx.body = numero1/numero2;
        }
    }
}

server.use(contexto);
server.listen(8081,() => { 
    console.log("Servidor ta  O N L I N E");
});