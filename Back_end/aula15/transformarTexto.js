const transformarTexto = (texto,transformadores) => {
    if (texto.length == 0){
        console.log("Escreva algo\n");
        return;
    }
    // Pega o texto transformado, o qual está na função transformadores, para retorná-lo
    let resultado = transformadores(texto) + "\n\ncódigo feito por Luís Felipe";
    return resultado;
};

const transformarLetras = (texto) => {
    let novoTexto = "";
    for (let i = 0; i < texto.length; i++){
        if (texto[i] === "a" || texto[i] === "A"){
            novoTexto += "4";
        }

        else if (texto[i] === "E" || texto[i] === "e"){
            novoTexto += "3";
        }
        
        else if (texto[i] === "I" || texto[i] === "i"){
            novoTexto += "1";
        }

        else if (texto[i] === "o" || texto[i] === "O"){
            novoTexto += "0";
        }

        else {
            novoTexto += texto[i]
        }
    }
    return novoTexto;
};

const removeBlank = (texto) =>{
    let novoTexto = ""
    for (let i = 0; i < texto.length; i++){
        if (texto[i] === " "){
            continue;
        }
        else {
            novoTexto += texto[i];
        }
    }
    return novoTexto;
}

let finalresult = transformarTexto("Oi eu sou Goku, aqui esta",removeBlank);
console.log(finalresult);