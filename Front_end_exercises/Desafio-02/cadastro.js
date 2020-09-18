const valorTotal = localStorage.getItem("valorTotal");
const spanSubtotal = document.querySelector(".subtotal");

const titulos = localStorage.getItem("titulos");
let objetoTitulos = JSON.parse(titulos); //TITULOS = ITEM DO CARRINHO

const divFilmes = document.querySelector(".carrinho .itens");

const cupom = document.querySelector(".spanCupom");
const spanCupom = localStorage.getItem("spanCupom");
if (spanCupom) {
    cupom.innerText = spanCupom;
    let desconto = valorTotal * 0.5
    spanSubtotal.innerText = `R$ ${desconto}`

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

const formCupom = document.querySelector(".carrinho form");
const inputCupom = document.querySelectorAll(".inputCupom");
const SpanCupom = document.querySelector(".spanCupom");
formCupom.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = event.target.querySelector("input");
    if (input.value.toLowerCase() == "htmlnaoelinguagem") {
        SpanCupom.innerText = "CUPOM: HTMLNAOELINGUAGEM - (50% OFF) \n*desconto aplicado no subtotal*";
        localStorage.setItem("spanCupom","HTMLNAOELINGUAGEM - (50% OFF)");
        let descontoFinal = valorTotal * 0.5
        spanSubtotal.innerText = `R$ ${descontoFinal}`
        inputCupom.forEach(item => item.setAttribute("hidden",""));
        cupom.innerHTML = "";
        clearInterval(idInterval);
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

    if (x === 12) { //numero de inputs
        location.href = "./sucesso.html";
    }

    else {
        alert("Digite todo o formulário");
        x = 0;
    }
})

localStorage.clear();