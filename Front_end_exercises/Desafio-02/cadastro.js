let valorTotal = localStorage.getItem("valorTotal");
let spanSubtotal = document.querySelector(".subtotal");

const titulos = localStorage.getItem("titulos");
let objetoTitulos = JSON.parse(titulos); //TITULOS = ITEM DO CARRINHO

const divFilmes = document.querySelector(".carrinho .itens");
const inputCupom = document.querySelectorAll(".inputCupom");
const cupom = document.querySelector(".spanCupom");
const spanCupom = localStorage.getItem("spanCupom");

if (spanCupom && spanCupom.innerText != "Insira seu cupom") {
    cupom.innerText = spanCupom;
    valorTotal = valorTotal * 0.5
    localStorage.setItem("valorTotal",valorTotal);
    inputCupom.forEach(item => item.setAttribute("hidden",""));
    spanSubtotal.innerText = `R$ ${valorTotal}`
}

else {
    spanSubtotal.innerText = `R$ ${valorTotal}`;
}
    
//LOOP
objetoTitulos.forEach(item => {
    const divPai = document.createElement("div");

    const divImagem = document.createElement("div"); 
    divImagem.style["background-image"] = item.urlBackground;

    const spanDescricao = document.createElement("span");
    spanDescricao.innerHTML = `<span>${item.titulo}<br/>R$ ${item.preco}</span>`;

    const spanQtd = document.createElement("span");


    const adicionarQtd = document.createElement("button");
    adicionarQtd.style["background-image"] = `url(./images/add.png)`;
    adicionarQtd.classList.add("adicionarQtd");

    const spanContador = document.createElement("span");
    spanContador.classList.add("contador");
    spanContador.innerText = item.quantidade;

    const removerQtd = document.createElement("button");
    if (item.quantidade == 1) {
        removerQtd.style["background-image"] = `url(./images/Delete.png)`;
    }
    
    else {
        removerQtd.style["background-image"] = `url(./images/menos.png)`;
    }
    
    removerQtd.classList.add("removerQtd");

    spanQtd.append(adicionarQtd);
    spanQtd.append(spanContador);
    spanQtd.append(removerQtd);
    divPai.append(divImagem);
    divPai.append(spanDescricao);
    divPai.append(spanQtd);
    divFilmes.append(divPai);
})

const formCupom = document.querySelector(".carrinho form");
const SpanCupom = document.querySelector(".spanCupom");
formCupom.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = event.target.querySelector("input");
    if (input.value.toLowerCase() == "htmlnaoelinguagem") {
        localStorage.setItem("spanCupom","HTMLNAOELINGUAGEM - (50% OFF)");
        valorTotal = valorTotal * 0.5
        localStorage.setItem("valorTotal",valorTotal);
        spanSubtotal.innerText = `R$ ${valorTotal} -> 50%`
        inputCupom.forEach(item => item.setAttribute("hidden",""));
        cupom.innerHTML = "";
    }

    else {
        SpanCupom.innerText = "Cupom Inválido";
        setTimeout(() => SpanCupom.innerText = "Insira seu cupom", 2000);
    }
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

    if (inputs[3].value && (inputs[3].value.length != 8 && inputs[3].value.length != 9)) {
        inputs[3].classList.add("erro");
        x--;
    }

    if (inputs[8].value && (inputs[8].value.length != 16 && inputs[8].value.length != 14)) {
        inputs[8].classList.add("erro");
        x--;
    }

    if (inputs[10].value && inputs[10].value.length != 7) {
        inputs[10].classList.add("erro");
        x--;
    }

    if (inputs[11].value && inputs[11].value.length != 3) {
        inputs[11].classList.add("erro");
        x--;
    }

    if (x === 12) { //numero de inputs
        location.href = "./sucesso.html";
        localStorage.clear();
    }

    else {
        alert("Digite corretamente o formulário");
        x = 0;
    }
})