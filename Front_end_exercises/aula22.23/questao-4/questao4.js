const button = document.querySelector("button");
const autor = document.querySelector(".autor");
const citacao = document.querySelector(".citacao");

const milissegundos = 2000;
getCitacao();

button.addEventListener("click",() => {
    button.innerText = `Buscando outra citação em ${milissegundos / 1000} segundos`;
    promessa(milissegundos).then(() => {
        getCitacao();
        button.innerText = "Carregar nova citação";
    })
    
})

const promessa = (milissegundos) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve();
        },milissegundos)
    })
}

function getCitacao () {
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random/lang/en").then(resposta => resposta.json())
    .then(respostaJson => {
        citacao.innerText = respostaJson.en;
        autor.innerHTML =  `<i> -${respostaJson.author}</i>`;
    })
}