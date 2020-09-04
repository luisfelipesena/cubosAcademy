const citacao = document.querySelector(".citacao");
const autor = document.querySelector(".autor");
const button = document.querySelector("button");

getCitacao();

button.addEventListener("click",() => {
    getCitacao();
})

function getCitacao () {
    fetch("https://programming-quotes-api.herokuapp.com/quotes/random/lang/en").then(resposta => resposta.json())
    .then(respostaJson => {
        citacao.innerText = respostaJson.en;
        autor.innerHTML =  `<i> -${respostaJson.author}</i>`;
    })
}