const fs = require("fs");
const chalk = require("chalk");

const cartas = (fs.readFileSync("cartas.txt")).toString();
let arrayMensagens = cartas.split("---\n");
let mensagens = [];

for (let i = 0; i < arrayMensagens.length; i++) {
   let espacos = arrayMensagens[i].split("\n");
   mensagens.push({
        remetente: espacos[0],
        destinatario: espacos[1],
        mensagem: espacos.splice(2)[0]
    });
}

const enderecos = (fs.readFileSync("enderecos.txt")).toString();
let arrayEnderecos = enderecos.split("---\n");
let moradores = [];

for (let i = 0; i < arrayEnderecos.length; i++) {
    let espacos = arrayEnderecos[i].split("\n");
    moradores.push({
        morador: espacos[0],
        endereco: espacos[1]
    });
}

let resultado = "";
for (let i = 0; i < mensagens.length; i++){
    for (let x = 0; x < moradores.length; x++){
        if (moradores[x].morador == mensagens[i].destinatario){
            resultado += `[INICIO DA MENSAGEM]\nRemetente: ${mensagens[i].remetente}\nDestinatário: ${moradores[x].morador}\nEndereço: ${moradores[x].endereco}\nMensagem: ${mensagens[i].mensagem}\n[FIM DA MENSAGEM]\n`;
        }
    }
}

fs.writeFile("Resultado.txt",resultado, (err) => {
                    if (err){
                        console.log(err);
                    }
                }
            );
console.log(chalk.green("Resultado.txt criado com suceso"));