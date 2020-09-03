const h1 = document.querySelector("h1");
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const button = document.querySelector("button");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
})

const submitBotao = () => {
    const formulario = {
        nome: inputs[0].value,
        idade: inputs[1].value,
        cpf: inputs[2].value,
        email: inputs[3].value,
        telefone: inputs[4].value
    }
    //Primeiro confere se todos tem informação, depois confere o cpf e por fim o telefone
    if (formulario.nome != "" && formulario.idade != "" && formulario.cpf != "" && formulario.email != "" && formulario.telefone != "") {
         if (formulario.cpf.length === 11) {   
             if (formulario.telefone.length == 8 || formulario.telefone.length == 9 || formulario.telefone.length == 10 || formulario.telefone.length == 11) {
                const formularioJson = JSON.stringify(formulario);
                localStorage.setItem("pessoa",formularioJson);
                location.href = "pessoa.html";
             }

             else {
                 h1.innerText = "Digite um Telefone Válido";
             }
         }

         else {
             h1.innerText = "Digite um CPF Válido";
         }
    }

    else {
        h1.innerText = "Dígite todo o formulário";
    }
    
}

button.addEventListener("click", submitBotao);