//Banner de cupom de desconto
const temporizador = document.querySelector(".temporizador");
const cupom = document.querySelector(".cupom");
const botaoCupom = document.querySelector(".botaoCupom");
const inputCupom = document.querySelectorAll(".inputCupom"); //input + imagem
const spanCupom = document.querySelector(".spanCupom");

botaoCupom.addEventListener("click",()=> {
    spanCupom.innerText = "CUPOM: HTMLNAOELINGUAGEM - (50% OFF) \n*desconto aplicado no subtotal*";
    localStorage.setItem("spanCupom","HTMLNAOELINGUAGEM - (50% OFF)");
    inputCupom.forEach(item => item.setAttribute("hidden",""));
    cupom.innerHTML = "";
    clearInterval(idInterval);
})

let idInterval;

function cupomContagem (count) {
    let minutos = Math.floor(count / 60).toFixed(0);
    temporizador.innerText = `00:0${minutos}:00`;
    count--; minutos--;
    let segundos = count % 60;
    idInterval = setInterval(async ()=> {
        if (count >= 60) {
            if (segundos < 10) {
                temporizador.innerText = `00:0${minutos}:0${segundos}`;
            }

            else {
                temporizador.innerText = `00:0${minutos}:${segundos}`;
            }   
        }

        else {
            if (segundos < 10) {
                temporizador.innerText = `00:00:0${segundos}`;
            }

            else {
                temporizador.innerText = `00:00:${segundos}`;
            }
        }

        count--;
        if (minutos === 0 && segundos === -1) {
            cupom.innerHTML = "";
            clearInterval(idInterval);
        }

        else if (segundos === -1) {
            segundos = 59;
            minutos--;
        }
        segundos--;
    },1000)
}

//Seção de Top Filmes
const ulTopFilmes = document.querySelector(".topFilmes");
const funcaoFetch = (url) => fetch(url).then(resposta => resposta.json())
let filmes
funcaoFetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(respostaJson => {
        filmes = respostaJson.results;
        adicionarTopFilmes(filmes);
    })

//Seção de Todos os filmes
const ulFilmes = document.querySelector(".allFilmes");
const botoesGenero = document.querySelectorAll(".generos button");
let identificador;

funcaoFetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(respostaJson => {
        let filmes = respostaJson.results;
        adicionarFilmes(filmes);
    })

//Guarda os id dos generos nos botões existentes
funcaoFetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR")
    .then(respostaJson => {
        respostaJson.genres.forEach(item => {
            if (item.name === "Ação") {
                const button = document.querySelector(".acao");
                button.setAttribute("value",item.id);
            }

            else if (item.name === "Romance") {
                const button = document.querySelector(".romance");
                button.setAttribute("value",item.id);
            }

            else if (item.name === "Ficção científica") {
                const button = document.querySelector(".ficcao");
                button.setAttribute("value",item.id);
            }

            else if (item.name === "Thriller") {
                const button = document.querySelector(".terror");
                button.setAttribute("value",item.id);
            }
        })
        return 0;
    })

    //caso clicado o botão dos gêneros, filtrar os filmes
    .then(resposta => {
        botoesGenero.forEach(botao => {
            botao.addEventListener("click", (event) => {
                identificador = event.target.value;
                funcaoFetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
                .then(respostaJson => {
                    let filmes = respostaJson.results;
                    adicionarFilmes(filmes,identificador);    
                })
            })
        })
    })

//Calculo do valor a pagar e add na Sacola
let valorTotal = 0; 
let titulos = [];

function addSacola () {
    let filmesAdicionados = [];
    let filme;
    const botaoCarrinho = document.querySelector(".carrinho > button");
    const spanCarrinho = document.querySelector(".valorTotal");
    const botaoSacola = document.querySelectorAll(".precoFilme");
    botaoSacola.forEach(botao => {
        botao.addEventListener("click", (event) => {
            //add valorfilme ao valortotal
            let valorFilme = botao.innerText.split("\n");
            valorFilme = Number(valorFilme[1].slice(2));
            valorTotal += valorFilme;
            localStorage.setItem("valorTotal",valorTotal);
            spanCarrinho.innerHTML = `R$ ${valorTotal}`;
            botaoCarrinho.style["display"] = "flex";
            botaoCarrinho.addEventListener("click", () => location.href = "cadastro.html");
            //retira a imagem e parágrafos da sacola vazia
            const paragrafoCarrinho = document.querySelectorAll(".itens p");
            paragrafoCarrinho.forEach(item => item.setAttribute("hidden",""));
            const sacolaVazia = document.querySelector(".itens img");
            sacolaVazia.setAttribute("hidden","");
            
            //FILME
            const liFilme = botao.closest("li");
            const titulo = liFilme.querySelector(`.titulo .tituloFilme span`);
            const itensCarrinho = document.querySelector(".itens");
            const divFilme = document.createElement("div");
            const div = document.createElement("div");
            const imagemFilme = liFilme.querySelector(".backgroundImage");
            div.style["background-image"] = imagemFilme.style["background-image"];
            divFilme.append(div);
            divFilme.innerHTML += `<span>${titulo.innerText}<br/>R$ ${valorFilme.toString().replace(".",",")}</span>`;
            //QUANTIDADE
            const spanQuantidade = document.createElement("span");
            const botaoAddQuantidade = document.createElement("button");
            const botaoRemoverQuantidade = document.createElement("button");
            const divsImagens = document.querySelectorAll(".itens div div");
            filmesAdicionados.push(new objetoFilme(titulo,1,imagemFilme.style["background-image"],valorFilme)); 
            
            for (let i = 0; i < divsImagens.length; i++) {
                if (divsImagens[i].style["background-image"] === imagemFilme.style["background-image"]) {
                    for (let x = 0; x < filmesAdicionados.length; x++) {
                        if (filmesAdicionados[x].urlStyle === imagemFilme.style["background-image"]) {
                            filmesAdicionados[x].qtd++;
                            filme = filmesAdicionados[x];
                            const qtd = document.querySelectorAll(".contador");
                            qtd[i].innerText = filme.qtd;
                            titulos[i].quantidade++;
                            localStorage.setItem("titulos",JSON.stringify(titulos));
                            return;
                        }
                    }
                }
            }
            
            for (let i = 0; i < filmesAdicionados.length; i++) {
                if (filmesAdicionados[i].titulo === titulo) {
                    filme = filmesAdicionados[i];
                }
            }

            if (filme.qtd === 1) {
                titulos.push({["titulo"]: titulo.innerText, ["urlBackground"]: filme.urlStyle,["quantidade"]: filme.qtd, ["preco"]: filme.valorFilme});
                localStorage.setItem("titulos",JSON.stringify(titulos));
                botaoAddQuantidade.style["background-image"] = `url(./images/add.png)`;
                botaoAddQuantidade.classList.add("adicionarQtd");
                spanQuantidade.append(botaoAddQuantidade);
                spanQuantidade.innerHTML += `<span class="contador">${filme.qtd}</span>`;
                botaoRemoverQuantidade.style["background-image"] = `url(./images/Delete.png)`;
                botaoRemoverQuantidade.classList.add("removerQtd");
                spanQuantidade.append(botaoRemoverQuantidade);
                divFilme.append(spanQuantidade);
                itensCarrinho.append(divFilme);
            }
        })
    })  
}

function pesquisarFilme () {
    const formPesquisa = document.querySelector(".conteudo form");
    const topFilmes = document.querySelector(".topFilmes");
    const allFilmes = document.querySelector(".allFilmes");
    let titulos = allFilmes.querySelectorAll("li .titulo .tituloFilme span");
    formPesquisa.addEventListener("submit", (event) => {
        event.preventDefault();
        let inputPesquisa = formPesquisa.querySelector("input");
        let pesquisa = inputPesquisa.value;
        if (pesquisa.length >= 12) {
            pesquisa = `${pesquisa.slice(0,13)}...`;
        }

        for (let i = 0; i < titulos.length; i++) {
            if (titulos[i].innerText.toLowerCase() == pesquisa.toLowerCase()) {
                topFilmes.innerHTML = "";
                topFilmes.append(titulos[i].closest("li"));
                inputPesquisa.style["outline"] = "1px solid green";
                return;
            }  
        }
        inputPesquisa.style["outline"] = "1px solid red";
        topFilmes.innerHTML = "";
        adicionarTopFilmes(filmes)
    })
}

function objetoFilme (titulo,qtd,urlStyle,valorFilme) {
    this.titulo = titulo;
    this.qtd = qtd;
    this.urlStyle = urlStyle;
    this.valorFilme = valorFilme;
}

//Funcoes que adicionam os filmes corretamente
function adicionarTopFilmes (filmes) {
    for (i = 0; i < 5; i++) {
        const li = document.createElement("li");
        const divTitulo = document.createElement("div"); 
        divTitulo.classList.add("titulo");
        const divTituloFilme = document.createElement("div"); 
        divTituloFilme.classList.add("tituloFilme");

        //add Título
        let titulo = filmes[i].title;
        if (titulo.length >= 12) {
            titulo = `${titulo.slice(0,13)}...`;
        }
        const tituloDoFilme = document.createElement("span");
        tituloDoFilme.innerText = titulo;
        divTituloFilme.append(tituloDoFilme);
        
        //add nota e estrelinha
        let nota = filmes[i].vote_average;
        const notaFilme = document.createElement("span");
        notaFilme.classList.add("nota");

        const estrelinha = document.createElement("img");
        estrelinha.setAttribute("src","./images/Star 1.png");
        estrelinha.classList.add("estrelinha");
        notaFilme.append(estrelinha);
        notaFilme.append(nota);
        divTituloFilme.append(notaFilme);
        
        //add tudo da divTituloFilme
        divTitulo.append(divTituloFilme);
        li.append(divTitulo);

        //add button sacola
        let valor = filmes[i].price;
        const botaoCarrinho = document.createElement("button");
        botaoCarrinho.classList.add("precoFilme");
        const spanSacola = document.createElement("span");
        spanSacola.innerText = `Sacola`;
        const spanValor = document.createElement("span");
        spanValor.innerText = `R$ ${valor}`;
        botaoCarrinho.append(spanSacola);
        botaoCarrinho.append(spanValor);
        divTitulo.append(botaoCarrinho);

        //add estrela
        let estrela = document.createElement("img");
        estrela.setAttribute("src","./images/Star 2.png");
        estrela.classList.add("estrela");
        li.append(estrela);

        //add Imagem poster
        let imagem = filmes[i].poster_path;
        const divImagem = document.createElement("div");
        divImagem.classList.add("backgroundImage");
        divImagem.style["background-image"] = `url(${imagem})`;
        const imagemFilme = document.createElement("div");
        divImagem.append(imagemFilme);
        li.append(divImagem);

        //add todo o li
        ulTopFilmes.append(li);
    }
}

function adicionarFilmes (filmes,id) {
    if (id) {
        ulFilmes.innerHTML = "";
        funcaoFetch(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${id}&language=pt-BR`)
        .then(respostaJson => {
            let filmesEspecificos = respostaJson.results;
            for (let i = 0; i < filmesEspecificos.length; i++) { 
                const li = document.createElement("li");
                const divTitulo = document.createElement("div"); 
                divTitulo.classList.add("titulo");
                const divTituloFilme = document.createElement("div"); 
                divTituloFilme.classList.add("tituloFilme");
            
                //add Título
                let titulo = filmesEspecificos[i].title;
                if (titulo.length >= 12) {
                    titulo = `${titulo.slice(0,13)}...`;
                }
                const tituloDoFilme = document.createElement("span");
                tituloDoFilme.innerText = titulo;
                divTituloFilme.append(tituloDoFilme);
                
                //add nota e estrelinha
                let nota = filmesEspecificos[i].vote_average;
                const notaFilme = document.createElement("span");
                notaFilme.classList.add("nota");
            
                const estrelinha = document.createElement("img");
                estrelinha.setAttribute("src","./images/Star 1.png");
                estrelinha.classList.add("estrelinha");
                notaFilme.append(estrelinha);
                notaFilme.append(nota);
                divTituloFilme.append(notaFilme);
                
                //add tudo da divTituloFilme
                divTitulo.append(divTituloFilme);
                li.append(divTitulo);
            
                //add button sacola
                let valor = filmesEspecificos[i].price;
                const botaoCarrinho = document.createElement("button");
                botaoCarrinho.classList.add("precoFilme");
                const spanSacola = document.createElement("span");
                spanSacola.innerText = `Sacola`;
                const spanValor = document.createElement("span");
                spanValor.innerText = `R$ ${valor}`;
                botaoCarrinho.append(spanSacola);
                botaoCarrinho.append(spanValor);
                divTitulo.append(botaoCarrinho);
            
                //add estrela
                let estrela = document.createElement("img");
                estrela.setAttribute("src","./images/Star 2.png");
                estrela.classList.add("estrela");
                li.append(estrela);
            
                //add Imagem poster
                let imagem = filmesEspecificos[i].poster_path;
                const divImagem = document.createElement("div");
                divImagem.classList.add("backgroundImage");
                divImagem.style["background-image"] = `url(${imagem})`;
                const imagemFilme = document.createElement("div");
                divImagem.append(imagemFilme);
                li.append(divImagem);
            
                //add todo o li
                ulFilmes.append(li); 
            }
            return;
        })
        .then(reposta => {
            pesquisarFilme();
            addSacola();
        });
    }

    else {
        ulFilmes.innerHTML = "";
        for (i = 0; i < 20; i++) {
            const li = document.createElement("li");
            const divTitulo = document.createElement("div"); 
            divTitulo.classList.add("titulo");
            const divTituloFilme = document.createElement("div"); 
            divTituloFilme.classList.add("tituloFilme");
        
            //add Título
            let titulo = filmes[i].title;
            if (titulo.length >= 12) {
                titulo = `${titulo.slice(0,13)}...`;
            }
            const tituloDoFilme = document.createElement("span");
            tituloDoFilme.innerText = titulo;
            divTituloFilme.append(tituloDoFilme);
            
            //add nota e estrelinha
            let nota = filmes[i].vote_average;
            const notaFilme = document.createElement("span");
            notaFilme.classList.add("nota");
        
            const estrelinha = document.createElement("img");
            estrelinha.setAttribute("src","./images/Star 1.png");
            estrelinha.classList.add("estrelinha");
            notaFilme.append(estrelinha);
            notaFilme.append(nota);
            divTituloFilme.append(notaFilme);
            
            //add tudo da divTituloFilme
            divTitulo.append(divTituloFilme);
            li.append(divTitulo);
        
            //add button sacola
            let valor = filmes[i].price;
            const botaoCarrinho = document.createElement("button");
            botaoCarrinho.classList.add("precoFilme");
            const spanSacola = document.createElement("span");
            spanSacola.innerText = `Sacola`;
            const spanValor = document.createElement("span");
            spanValor.innerText = `R$ ${valor}`;
            botaoCarrinho.append(spanSacola);
            botaoCarrinho.append(spanValor);
            divTitulo.append(botaoCarrinho);
        
            //add estrela
            let estrela = document.createElement("img");
            estrela.setAttribute("src","./images/Star 2.png");
            estrela.classList.add("estrela");
            li.append(estrela);
        
            //add Imagem poster
            let imagem = filmes[i].poster_path;
            const divImagem = document.createElement("div");
            divImagem.classList.add("backgroundImage");
            divImagem.style["background-image"] = `url(${imagem})`;
            const imagemFilme = document.createElement("div");
            divImagem.append(imagemFilme);
            li.append(divImagem);
        
            //add todo o li
            ulFilmes.append(li);   
        }
        addSacola();
        pesquisarFilme()
    }
}
cupomContagem(300); //segundos
