let corpo = document.querySelectorAll(".corpo div"); // seleciona todos os membros do boneco
const letrasBotoes = document.querySelectorAll('.botoes button'); // seleciona todas as letras dos botões
let letras = document.querySelector('.letras'); // seleciona a div das letras
const palavras = ["pular", "muro", "celular", "varal"]; //palavras que estarão presentes na forca

let palavra = ""; 
palavra += escolherElementoAleatorio(palavras); //pega uma das palavras do index e coloca como string
let tentativas = corpo.length - 1;
let acertos = 0;
let erros = 0;

for (let i = 0; i < palavra.length; i++) {
      let span = document.createElement("span");
      span.classList.add("letra"); //adiciona a classe .letra que já deixa os "_" do tamanho da palavra na tela
      letras.append(span); //add ao div letras
  }

  document.addEventListener("keypress", (event) => { //add o ouvinte para todos os botões
         let letraClicada = event.key;
         if (palavra.includes(letraClicada)) {
           exibirLetra(palavra,letraClicada);
           desabilitarBotao(letraClicada);//desabilita a letra clicada evitando repetições
         }
         
         else {
            if (tentativas !== erros) {
             corpo[erros].classList.remove("hide"); //como é uma lista vamos tirando o hide para cada erro dessa forma
             desabilitarBotao(letraClicada); //bloqueia o botao para não repetir o erro
           }
           else {
            alert("Você perdeu! Tente de novo!");
            window.location.reload(true);
           }
           erros++; //add o erro++ depois para pegar o corpo[0]
          }
 })


const exibirLetra = (palavra,letra)=> {
  let spans = document.querySelectorAll(".letras span"); //pega todos os campos de span de palavras.length
  for (let i = 0; i < palavra.length; i++) {
    if (spans[i].innerText == "" && palavra[i] == letra) { //apenas se o campo spans estiver vazio e a letraClicada corresponder com a sua posicao na palavra que damos o append em seu devido index
      spans[i].append(palavra[i]);
      acertos++; //add acertos++ para cada letra acertada, se forem 2 letras de vez add acertos += 2
    }
  }
    if (acertos == palavra.length && erros != tentativas) {
        alert("Você Ganhou !");
        window.location.reload(true);
    }
}

const desabilitarBotao = (letraClicada)=>{
  for (let i = 0; i < letrasBotoes.length; i++) {
    if (letrasBotoes[i].innerText == letraClicada) {
      letrasBotoes[i].disabled = true;
      break;
    }
  }
}



function gerarNumeroInteiroAleatorio(min, max) {
    // número fracionário aleatório maior ou igual a 0 e menor que 1
    const aleatorioDeBase = Math.random();
    // número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
    const aleatorioFracionario = Math.random() * (max - min + 1);
    // número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
    // Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
    const aleatorioInteiro = Math.trunc(aleatorioFracionario);
    // número inteiro aleatório maior ou igual a min e menor ou igual a max
    return min + aleatorioInteiro;
}

function escolherElementoAleatorio(array) {
    return array[gerarNumeroInteiroAleatorio(0, array.length - 1)]
}