const forca = {
    palavra: "arroz",

    tentativas: 5,

    //funcao que imprime no display as letras 
    imprimirDados: (display) => {
      let palavra = "";
      for (let i = 0; i < forca.palavra.length; i++){
        palavra += `${display[i]} `;
      }
      console.log(`\n${palavra}\n`);
    },

    //funcao com os mecanismos da forca
    jogar: () => {
      console.log ("Digite 0 para sair...");
      //quantidade de acertos
      let acertos = 0;
      //contador de letras chutadas erradas, fora do loop
      let count = 0;
      //outro contador, esse contabiliza as letras do usuário que se igualam as letras da Palavra
      let p = 0;
      //letra escolhida pelo usuario
      let letraChute;
      //array com as letras chutadas erradas, fora do loop
      let erradas = [];
      //palavras acertadas pelo usuário
      let palavraUser = [];
      //array com os underlines e possiveis letras acertadas que aparecem na tela
      let display = [];

      //inicialmente printa "_" para a quantidade de casas da palavra
      for (let i = 0; i < forca.palavra.length; i++){
        display[i] = "_ ";
      }
      //imprime primordialmente "_" que mostam a quantidade de casas
      forca.imprimirDados(display);

      //repete o ciclo até acabarem as tentativas ou quando digitado 0 ou quando acerta todas as letras da palavra
      while (1) {
        //prompt usado do browser do Repl.it
        letraChute = prompt("Digite a Letra ");
        if (letraChute == "0"){
          console.log("Obrigado por Jogar !!");
          break;
        }
    
        //compara as letras chutadas com as letras da palavra
        for (let i = 0; i < forca.palavra.length; i++){
          if (letraChute == forca.palavra[i]){
            //adiciona ao array palavraUser as letras acertadas
            palavraUser.push(letraChute);
            for (let k = 0; k < palavraUser.length; k++){
              //se todas as letras chutadas condizerem com as letras da palavra, acaba
              if (palavraUser[k] == forca.palavra[i] && forca.tentativas > 0){
                p++;
                break;
              }
          }
            //Para mostrar no display a letra acertada:
            display[i] = letraChute;
            //contabiliza acerto
            acertos++;
          }
        }
        //imprime letras acertadas e underlines
        forca.imprimirDados(display);
        if (p == forca.palavra.length){
          console.log(`Parabéns Você Ganhou, a palavra era ${forca.palavra} !!`);
          return;
        }
        //Caso não haja acertos, logo a letra chutada não aparece na palavra: perde-se tentativas
        if (acertos === 0){
          erradas.push(letraChute);
          for (let i = 0; i < erradas.length; i++){
            if (erradas[i] == letraChute){
              count++;
            }
          }
          //caso a mesma letra tenha sido chutada 2 vezes não perdem-se mais tentativas
          if (count >= 2){
            console.log(`Letra: ${letraChute}, já foi chutada\n`);
          }

          else{
            forca.tentativas--;
            console.log(`Letra: ${letraChute}, não está presente\n`);
          }
          count = 0;
        }
        
        if (forca.tentativas === 0){
            console.log("Iih, você perdeu! Comece novamente!\n");
            return;
        }
        console.log(`Você ainda tem ${forca.tentativas} tentativas\n`);
        acertos = 0;
      }
    }
  };
  
  forca.jogar();
  
  
  