const input = document.querySelector("input");
const botao = document.querySelector("button");

botao.addEventListener("click", () => {
    let entrada = input.value;
    questao10(entrada);
});

const questao2 = (input) => {
    if ((input.toLowerCase()).includes("desenvolvimento")){
        alert("Sim");
    }
    else {
        alert("Não");
    }
}

const questao3 = (input) => {
    let saida = (input.toLowerCase()).trim();
    alert(saida);
}

const questao4 = (input) => {
    let saida = (input.replace("-","")).replace(".","");
    alert(saida);
}

const questao5 = (input) => {
    let array = (input.trim()).split(" ");
    let saida = "";
    for (let i = 0; i < array.length; i++){
        array[i] = array[i].replace(array[i][0],array[i][0].toUpperCase());
        saida += `${array[i]} `;
    }
    alert(saida);
}

const questao6 = (input) => {
    let array = (input.trim()).split(" ");
    let saida = "";
    for (let length = array.length - 1; length >= 0; length--){
        saida += `${array[length]} `;
    }
    alert(saida);
}

const questao7 = (input) => {
    let array = (input.trim()).split(" ");
    let saida = "";
    for (let i = 0; i < array.length; i++){
        if ((array[i].toLowerCase()).includes("muito")) {
            array[i] = array[i].toUpperCase();
        }
        saida += `${array[i]} `;
    }
    alert(saida);
}

const questao8 = (input) => {
    let array = input.split(" ");
    let saida = array[array.length - 1];
    saida = saida.padStart(input.length,`**** `);
    alert(saida);
}

const questao9 = (input) => {
    if ((input.trim()).length == 8)  {
        let inicio = (input.trim()).substr(0,5);
        let saida = `${inicio}-`;
        for (let i = 0; i < input.length; i++){
            if (saida[i].includes(inicio[i])) {
                continue;
            }
            else {
                saida += input[i];
            }
        }
        alert(saida);
    }
    else {
        alert("Insira um CEP");
    }
}

const questao10 = (input) => {
    let ddd;
    let inicio;
    let final;
    let saida = "";

    if (input.trim().length == 9) {
        inicio = (input.trim()).substr(0,5);
        final = (input.trim()).substr(5,4);
        saida += `${inicio}-`;
    }

    else if(input.trim().length == 8) {
        inicio = (input.trim()).substr(0,4);
        final = (input.trim()).substr(4,4);
        saida += `9${inicio}-`;
    }

    else if (input.trim().length == 11) {
        ddd = (input.trim()).substr(0,2);
        inicio = (input.trim()).substr(2,5);
        final = (input.trim()).substr(7,4);
        saida += `(${ddd}) ${inicio}-`;
    }

    else if (input.trim().length == 10) {
        ddd = (input.trim()).substr(0,2);
        inicio = (input.trim()).substr(2,4);
        final = (input.trim()).substr(6,4);
        saida += `(${ddd}) 9${inicio}-`;
    }

    else {
        alert ("Insira Um Número de Telefone");
    }

    saida += final;
    alert(saida);
}