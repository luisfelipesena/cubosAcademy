const body = document.querySelector("body");
const foguete = document.querySelector(".foguete");
const gifFoguete = document.querySelector(".gifFoguete");
const divMensagens = document.querySelector(".mensagens");
let botao = document.querySelector("button");

const mensagens = document.createElement("span"); 
mensagens.innerText = "Preparando para contagem regressiva"; // Texto Inicial
divMensagens.append(mensagens); // adiciona esse <span> na <div> das Mensagens no display
let count = 10; // variável global da contagem regressiva
let id; // variável que recebe o id retornato pela função setInterval()

botao.addEventListener("click", () => {
    botaoClicado(); //chama a função ao click do botão
})

const botaoClicado = () => {
    let fraseBotao = botao.innerText; // Guarda o conteúdo Textual do botão
    if (fraseBotao.includes("Iniciar Contagem Regressiva !")){ // Esse é o texto inicial presente no html do botão
        botao.innerText = "Abortar a missão"; // Muda o texto do botão para possibilitar o abortamento da missão
        botao.classList.add("abortar"); // adiciona a classe que deixa uma sombra vermelha
        id = setInterval(contagemRegressiva,1000); // aciona a funcao de 1 em 1 s
    }

    else { // caso o conteudo textual do botão inclua outro conteúdo significa que o usuario pediu pra abortar missão
        mensagens.innerText = "Missão Abortada";
        botao.disabled = true; //desabilita ações no botao de Missão Abortada
        outraMissão(); // Caso a missão seja abortada, abre-se a opção de iniciar outra missão nessa função
        divMensagens.classList.remove("decolar"); // tira completamente a sombra verde dada na funçao contagemRegressiva() -> .toggle()
        divMensagens.classList.add("abortar"); // e coloca a sombra vermelha
        foguete.classList.remove("decolar"); // tira completamente a sombra verde dada na funçao contagemRegressiva() -> .toggle()
        foguete.classList.add("abortar"); // e coloca a sombra vermelha
        botao.innerText = "Missão Abortada"; 
        pararContagem(id); // aciona a função pararcontagem(id) que da o clearInterval(id) -> id sendo variável global
        foguete.removeAttribute("hidden"); // Remove o hidden da imagem estática
        gifFoguete.setAttribute("hidden",""); // Adiciona o hidden à imagem dinâmica
    }
}

const contagemRegressiva = () => {
    foguete.classList.toggle("decolar"); // adiciona o efeito da borda verde piscando de 1 em 1s
    divMensagens.classList.toggle("decolar"); // adiciona o efeito da borda verde piscando de 1 em 1s
    mensagens.innerText = count; // adiciona os segundos passados no box de mensagens
    if (count == 0) {
        pararContagem(id); //quando bate 0s para-se a contagem
        mensagens.innerText = "Lançamento iniciado!"; 
        foguete.setAttribute("hidden",""); // adiciona o hidden na imagem estática
        gifFoguete.removeAttribute("hidden"); // remove o hidden da imagem dinâmica
        gifFoguete.classList.add("decolar"); // adiciona a sombra verde na imagem dinâmica
        divMensagens.classList.add("decolar"); // adiciona a sombra verde no bloco de mensagens
    }
    count--; // Remove 1 do count permitindo a contagem dos segundos
}

const pararContagem = (id) => {
    clearInterval(id); // para o setInterval() por completo, parando a contagemRegressiva()
}

const outraMissão = () => {
    const botaoRepetir = document.createElement("button"); //cria-se outro botão
    botaoRepetir.innerText = "Tentar Outra Missão";
    body.append(botaoRepetir); // adiciona esse botão como ultímo filho do body
    botaoRepetir.addEventListener("click", () => {
        window.location.reload(true); //quando clicado, recarrega a página
    });
}
