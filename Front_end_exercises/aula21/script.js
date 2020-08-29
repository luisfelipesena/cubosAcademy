const form = document.querySelector("form"); //Seleciona o formulário para usar do submit
const checkbox = form.querySelector(".checkbox") //Seleciona o checkbox do formulário
const inputText = form.querySelector(".inputTexto"); //Seleciona o Input Text do formulário
const aFazer = document.querySelector(".aFazer");//Seleciona a div das tarefas a Fazer
const feitas = document.querySelector(".feitas");//Seleciona a div das tarefas Feitas
const spanItens = document.querySelector(".count"); //Seleciona o span interativo com a qtd de tarefas
const allTodas = document.querySelector(".texto .todas"); //Seleciona o botão que mostra todas as tarefas
const allAFazer = document.querySelector(".texto .aFazer");//Seleciona o botão que mostra todas as tarefas que faltam fazer
const allCompletadas = document.querySelector(".texto .completadas");//Seleciona o botão que mostra todas as tarefas completadas
const limparCompletadas = document.querySelector(".texto .limpar");

let itensAFazer = 0; //Contador de quantidade de Tarefas A Fazer
spanItens.innerText = `${itensAFazer} itens a fazer`; //Mostra no Site

form.addEventListener("submit", (event) => { //Ao formulário sofrer submit:
    event.preventDefault();//Prevenimos o comportamento padrão de enviar o formulário

    const li = document.createElement("li"); //cria <li>

    const divCheckbox = document.createElement("input");//cria um checkbox
    divCheckbox.setAttribute("type","checkbox");
    divCheckbox.addEventListener("input", riscado); //quando o checkbox é ativado chama a função riscado

    const textoInput = document.createElement("span");//cria um span
    textoInput.innerText = inputText.value;//add nesse span o que foi digitado no Input Text

    const deletar = document.createElement("button");//cria um botão
    deletar.innerText = "Deletar";
    deletar.addEventListener("click",deletarOpcao); //quando esse botão é clicado ativa-se a função deletarOpcao
    
    li.append(divCheckbox);//add dentro do <li> criado a checkbox criada
    li.append(textoInput);//add dentro do <li> criado o <span> criado
    li.append(deletar);//add dentro do <li> criado o botão de deletar criado
    aFazer.append(li);//add dentro da <div> A Fazer, todo esse <li> criado

    if (checkbox.checked) { //se o checkbox do formulário estiver ativo
        divCheckbox.checked = true; //o checkbox das tarefas também fica marcado
        feitas.append(divCheckbox.closest("li")); //e add todo esse <li> a div de classe feitas
    }

    else { 
        itensAFazer++; //caso não, add mais um count de tarefas
        spanItens.innerText = `${itensAFazer} itens a fazer`;
    }
    
});

checkbox.addEventListener("input",() => { //caso o checkbox do form seja clicado
    const allLi = document.querySelectorAll("li"); //seleciona todos os li criados
    let count = 0; //cria um count zerado
    (checkbox.checked)? allLi.forEach((item,i) => { //caso o checkbox do form esteja marcado
        const checkboxLista = allLi[i].querySelector("input");//seleciona o checkbox de cada li
        if (!checkboxLista.checked) {//caso esses não estejam marcados
            itensAFazer--; //retira-se o count de itens a fazer, caso não, não retira
        }
        checkboxLista.checked = true; //deixa todos os checkboxs marcados
        feitas.append(allLi[i]); //add a <div> de classe feitas ~line-through~
        spanItens.innerText = `${itensAFazer} itens a fazer`;
    })
    :allLi.forEach((item,i) => { //caso o checkbox do form não esteja marcado
        const checkboxLista = allLi[i].querySelector("input");//seleciona o checkbox de cada li
        if (checkboxLista.checked) {//caso esses estejam marcados
            itensAFazer++; //add + count de itens a fazer, caso não, não adiciona
        }
        checkboxLista.checked = false; //deixa todos os checkboxs desmarcados
        aFazer.append(allLi[i]);//add a <div> de classe a Fazer
        spanItens.innerText = `${itensAFazer} itens a fazer`;
    })

});

const riscado = (event) => { //essa função aplica e desaplica o line-through nas <li> de tarefas quando o checkbox é clicado ou desclicado
    const checkboxLista = event.target;
    const li = checkboxLista.closest("li");
    const allLi = document.querySelectorAll("li");
    let count = allLi.length; //add um count da quantidade de todos os li
    allLi.forEach((item,i) => {
    
        if (allLi[i].querySelector("input").checked) {
            count--; //se o checkbox de um dos li estiverem marcados, retira -1 count
        }

        if (count == 0) { //caso o count iguale-se a zero, logo todos os li tem seus checkbox marcados,
            checkbox.checked = true; // logo marca-se também o checkbox do formulário
        }

        else if (count == allLi.length) { //caso o count mantenha-se igual a quantidade de todos os li, logo todos os li tem seus checkbox desmarcados,
            checkbox.checked = false; //logo desmarca-se também o checkbox do formulário
        }

    })

    if (checkboxLista.checked) { //se o checkbox clikado estiver marcando
        feitas.append(li); //add a div de classe feitas
        itensAFazer--;// retira -1 do count de itens a fazer
        spanItens.innerText = `${itensAFazer} itens a fazer`;
    }

    else { //caso o checkbox clikado estiver desmarcando
        aFazer.append(li); //add a div de classe a Fazer
        itensAFazer++; //add +1 ao count de itens a fazer
        spanItens.innerText = `${itensAFazer} itens a fazer`;
    }
}

const deletarOpcao = (event) => { //essa função deletará todo o <li> que foi escolhido previamente
    const botao = event.target; 
    const li = botao.closest("li");
    li.remove();
    if (!li.querySelector("input").checked) { //caso o checkbox desse li específico estiver desmarcado
        itensAFazer--; //retira-se -1 do count itens a fazer, caso marcado, não mudaria essa contagem, apenas deletaria
    }
    spanItens.innerText = `${itensAFazer} itens a fazer`;
}

limparCompletadas.addEventListener("click", () => { //essa funcao remove todas as <li> com checkbox marcado
    const allLi = document.querySelectorAll("li");
    allLi.forEach((item,i) => {
        let checkboxLista = allLi[i].querySelector("input");
        if (checkboxLista.checked) {
            allLi[i].remove();
        }
    })
})


allTodas.addEventListener("click",()=> { //essa função mostra na tela todas as tarefas, a serem feitas e as concluidas
    const allLi = document.querySelectorAll("li");
    allLi.forEach((item,i) => {
        allLi[i].style["display"] = "flex"; //modifica o display de todos os <li> para o seu inicial que é Flex
    })
})

allAFazer.addEventListener("click",()=> { //essa função mostra na tela apenas as tarefas a serem feitas, OCULTANDO as concluidas
    const allLi = document.querySelectorAll("li");
    allLi.forEach((item,i) => {
        const checkboxLista = allLi[i].querySelector("input");
        if (checkboxLista.checked) { //caso concluidas, OCULTAM essa com display none
            allLi[i].style["display"] = "none";
        }
        else {
            allLi[i].style["display"] = "flex"; //as que não forem concluidas mostram-se
        }
    })
})

allCompletadas.addEventListener("click",()=> { //essa função mostra na tela apenas as tarefas concluidas,OCULTANDO as que estejam A Fazer 
    const allLi = document.querySelectorAll("li");
    allLi.forEach((item,i) => {
        const checkboxLista = allLi[i].querySelector("input");
        if (!checkboxLista.checked) { //caso estejam A Fazer, OCULTAM essa com display none
            allLi[i].style["display"] = "none";
        }
        else {
            allLi[i].style["display"] = "flex"; //as que não forem A Fazer mostram-se
        }
    
    })
})