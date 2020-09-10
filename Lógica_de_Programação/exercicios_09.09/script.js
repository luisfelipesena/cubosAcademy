const fs = require("fs");
const stream = fs.createReadStream("brasileirao.txt");

const tabela = []; //guardará a tabela formatada do brasileirão
let objetoJogos; //guardará todos os jogos separadamente formatados em objetos nomeados, útil pois usei uma função assíncrona

stream.on("data", (data) => {
    const stringBrasileirao = data.toString(); //String de todo o conteúdo
    const arrayJogos = stringBrasileirao.split("\n"); //Jogos por linha
    objetoJogos = arrayJogos.map(linha => { //Jogos Formatado em um objeto
        const jogo = linha.split("\t"); //quebrar em "/t" porque o arquivo está com tab entre linhas
        const objeto = {
            timeA: jogo[0],
            timeB: jogo[4].replace("\r",""),
            golsA: Number(jogo[1]),
            golsB: Number(jogo[3]),
        }
        return objeto;
    })

    objetoJogos.forEach(item => { //ver empate, vitória derrota
        if (item.golsA === item.golsB) {
            //e = empate
            computarPontos(item.timeA,1,item.golsA,item.golsB,"e");
            computarPontos(item.timeB,1,item.golsB,item.golsA,"e");
        }

        else if (item.golsA > item.golsB) {
            //v = vitoria e d = derrota
            computarPontos(item.timeA,3,item.golsA,item.golsB,"v"); 
            computarPontos(item.timeB,0,item.golsB,item.golsA,"d");
        }

        else {
            computarPontos(item.timeB,3,item.golsB,item.golsA,"v");
            computarPontos(item.timeA,0,item.golsA,item.golsB,"d");
        }
    })



})

stream.on("end", () => {
    ordenarTabela(); //ordena a tabela corretamente
    //Funcões possíveis:
    arquivoTabela(); //criar um arquivo tabela.txt formatado
    jogosTime("São Paulo"); //todos os jogos desse time
    rodada(12); //todos os jogos dessa rodada
    libertadores(); //primeiros 4 times
    rebaixados(); //últimos 4 times
})

function computarPontos (time,pontos,golsFeitos,golsSofridos,sigla) {
    for (let i = 0; i < tabela.length; i++) {
        if (tabela[i].time === time) {
            tabela[i].pontos += pontos;
            tabela[i].golsFeitos += golsFeitos;
            tabela[i].golsSofridos += golsSofridos;
            tabela[i].saldo = golsFeitos - golsSofridos;
            tabela[i].jogos += 1;
            if (sigla === "v") {
                tabela[i].vitorias++;
            }

            else if (sigla === "e") {
                tabela[i].empates++;
            }

            else {
                tabela[i].derrotas++;
            }
            return;
        }
    }

    tabela.push({
        time: time,
        pontos: pontos,
        vitorias: 0,
        derrotas: 0,
        empates: 0,
        golsFeitos: golsFeitos,
        golsSofridos: golsSofridos,
        saldo: golsFeitos - golsSofridos,
        jogos: 1,
    })
}

function ordenarTabela () {
    let temp;
    for (let i = 0; i < tabela.length; i++) {
        for (let x = 0; x < tabela.length - 1; x++) {
            if (tabela[x].pontos < tabela[x+1].pontos) {
                temp = tabela[x];
                tabela[x] = tabela[x+1];
                tabela[x+1] = temp;
            }
        }
    }

    for (let i = 0; i < tabela.length - 1; i++) {
        if (tabela[i].pontos === tabela[i+1].pontos) {
            if (tabela[i].vitorias < tabela[i+1].vitorias) {
                temp = tabela[i];
                tabela[i] = tabela[i+1];
                tabela[i+1] = temp;
            }

            else if (tabela[i].vitorias === tabela[i+1].vitorias) {
                if (tabela[i].saldo < tabela[i+1].saldo) {
                    temp = tabela[i];
                    tabela[i] = tabela[i+1];
                    tabela[i+1] = temp;
                }

                else if (tabela[i].saldo === tabela[i+1].saldo) {
                    if (tabela[i].golsFeitos < tabela[i+1].golsFeitos) {
                        temp = tabela[i];
                        tabela[i] = tabela[i+1];
                        tabela[i+1] = temp;
                    }
                }
            }
        }
    }
}

function arquivoTabela () {
    let tabelaString = "";
    tabela.forEach((item,i) => tabelaString += `${i+1} lugar -> ${item.time} - ${item.pontos} pontos - ${item.jogos} jogos - ${item.vitorias} vitorias - ${item.derrotas} derrotas - ${item.empates} empates - saldo de gols: ${item.saldo}\n`);
    fs.writeFileSync("tabela.txt",tabelaString);
}

function jogosTime (time) {
    let timeString = "";
    objetoJogos.forEach((item,i) => {
        if (item.timeA === time || item.timeB === time) {
            timeString += `\n${item.timeA} ${item.golsA} X ${item.golsB} ${item.timeB}\n`;
        }
    })

    if (timeString != "") {
        console.log(timeString);
    }

    else {
        console.log("Time não encontrado");
    }
}

function rodada (rodada) {
    if (rodada < 1 || rodada > 38) {
        console.log("Digíte uma rodada válida");
        return false;
    }

    let indexJogoInicial;
    let indexJogoFinal = rodada * 10;

    if (rodada === 1) {
        indexJogoInicial = 0;
    }

    else {
        indexJogoInicial = indexJogoFinal - 10;
    }

    const rodadaJogos = objetoJogos.slice(indexJogoInicial,indexJogoFinal).map(item => `${item.timeA} ${item.golsA} X ${item.golsB} ${item.timeB}`);
    console.log(rodadaJogos);
}

function libertadores () {
    const liberta = tabela.slice(0,4).map(item => `${item.time}`);
    console.log(liberta);
}

function rebaixados () {
    const rebaixados = tabela.slice(16,20).map(item => `${item.time}`);
    console.log(rebaixados);
}