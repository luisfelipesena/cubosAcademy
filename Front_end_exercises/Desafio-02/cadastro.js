const valorTotal = localStorage.getItem("valorTotal");
const spanSubtotal = document.querySelector(".subtotal");
spanSubtotal.innerHTML = `R$ ${valorTotal}`;

const titulos = localStorage.getItem("titulos");
let objetoTitulos = JSON.parse(titulos); //TITULOS = ITEM DO CARRINHO

const divFilmes = document.querySelector(".carrinho .itens");


//LOOP
objetoTitulos.forEach(item => {
    const divPai = document.createElement("div");

    const divImagem = document.createElement("div"); 
    divImagem.style["background-image"] = item.urlBackground;

    const spanDescricao = document.createElement("span");
    spanDescricao.innerHTML = `<span>${item.titulo}<br/>R$ ${item.preco}</span>`;

    const spanQtd = document.createElement("span");


    const adicionarQtd = document.createElement("button");
    adicionarQtd.innerText = "+";
    adicionarQtd.classList.add("adicionarQtd");

    const spanContador = document.createElement("span");
    spanContador.classList.add("contador");
    spanContador.innerText = item.quantidade;

    const removerQtd = document.createElement("button");
    removerQtd.innerText = "-";
    removerQtd.classList.add("removerQtd");


    spanQtd.append(adicionarQtd);
    spanQtd.append(spanContador);
    spanQtd.append(removerQtd);
    divPai.append(divImagem);
    divPai.append(spanDescricao);
    divPai.append(spanQtd);
    divFilmes.append(divPai);
})





const comprarAgora = document.querySelector(".carrinho > button");
const inputs = document.querySelectorAll(".central form input");
let x = 0;
comprarAgora.addEventListener("click", () => {
    for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].value){
            x++;
            inputs[i].classList.remove("erro");
        }
        
        else {
            inputs[i].classList.add("erro");
        }
    }

    if (x === 12) { //numero de inputs
        location.href = "./sucesso.html";
    }

    else {
        alert("Digite todo o formulário");
        x = 0;
    }
})

localStorage.clear();