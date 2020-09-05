const botao = document.querySelector("button");

const promessa = new Promise(resolve => 
    botao.addEventListener("click", () => {
       resolve();
    })
);

promessa.then(resposta => alert("oi"));

