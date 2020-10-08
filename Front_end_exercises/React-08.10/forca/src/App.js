import React from "react";
import "./App.css";

let contador = 0;
const palavras = ["arroz", "banana", "loucura", "bala", "brasil"];

function App() {
  const [botoes, mudarBotoes] = React.useState([
    {
      letra: "a",
      disabled: false,
    },
    {
      letra: "b",
      disabled: false,
    },
    {
      letra: "c",
      disabled: false,
    },
    {
      letra: "d",
      disabled: false,
    },
    {
      letra: "e",
      disabled: false,
    },
    {
      letra: "f",
      disabled: false,
    },
    {
      letra: "g",
      disabled: false,
    },
    {
      letra: "h",
      disabled: false,
    },
    {
      letra: "i",
      disabled: false,
    },
    {
      letra: "j",
      disabled: false,
    },
    {
      letra: "k",
      disabled: false,
    },
    {
      letra: "l",
      disabled: false,
    },
    {
      letra: "m",
      disabled: false,
    },
    {
      letra: "n",
      disabled: false,
    },
    {
      letra: "o",
      disabled: false,
    },
    {
      letra: "p",
      disabled: false,
    },
    {
      letra: "q",
      disabled: false,
    },
    {
      letra: "r",
      disabled: false,
    },
    {
      letra: "s",
      disabled: false,
    },
    {
      letra: "t",
      disabled: false,
    },
    {
      letra: "u",
      disabled: false,
    },
    {
      letra: "v",
      disabled: false,
    },
    {
      letra: "w",
      disabled: false,
    },
    {
      letra: "x",
      disabled: false,
    },
    {
      letra: "y",
      disabled: false,
    },
    {
      letra: "z",
      disabled: false,
    },
  ]);

  const [palavra, mudarPalavra] = React.useState(
    escolherElementoAleatorio(palavras).split("")
  );
  const [letrasCorretas, mudarLetrasCorretas] = React.useState([]);
  const [letrasErradas, mudarLetrasErradas] = React.useState([]);

  return (
    <div className="App">
      <div class="container-forca">
        <div class="forca">
          <div class="base"></div>
          <div class="esquerda"></div>
          <div class="topo"></div>
          <div class="direita"></div>
        </div>

        <div class="corpo" hidden={letrasErradas.length === 0}>
          <div class="cabeca" hidden={!letrasErradas[0]}></div>
          <div class="tronco" hidden={!letrasErradas[1]}></div>
          <div class="braco direito" hidden={!letrasErradas[2]}></div>
          <div class="braco esquerdo" hidden={!letrasErradas[3]}></div>
          <div class="perna direito" hidden={!letrasErradas[4]}></div>
          <div class="perna esquerdo" hidden={!letrasErradas[5]}></div>
        </div>
      </div>

      <div class="letras">
        {palavra.map((letra) => (
          <span className="letra">
            {letrasCorretas.map((item) => (item === letra ? letra : ""))}
          </span>
        ))}
      </div>

      <div class="botoes">
        {botoes.map((botao) => (
          <button
            disabled={botao.disabled}
            onClick={(ev) => {
              const letra = ev.target.innerText;
              const tentativa = palavra.filter((i) => i === letra);
              tentativa.length !== 0
                ? mudarLetrasCorretas([...letrasCorretas, letra])
                : mudarLetrasErradas([...letrasErradas, letra]);

              contador += tentativa.length;
              if (palavra.length === contador) {
                mudarBotoes((bt) =>
                  bt.map((b) => ({
                    ["letra"]: b.letra,
                    disabled: false,
                  }))
                );
                mudarPalavra(escolherElementoAleatorio(palavras).split(""));
                mudarLetrasCorretas([]);
                mudarLetrasErradas([]);
                contador = 0;
                alert("Parabéns você acertou");
              } else if (letrasErradas.length === 5) {
                mudarBotoes((bt) =>
                  bt.map((b) => ({
                    ["letra"]: b.letra,
                    disabled: false,
                  }))
                );
                mudarPalavra(escolherElementoAleatorio(palavras).split(""));
                mudarLetrasCorretas([]);
                mudarLetrasErradas([]);
                contador = 0;
                alert("Poxa você perdeu");
              } else {
                mudarBotoes((bt) =>
                  bt.map((b) =>
                    b.letra === letra ? { ...b, disabled: true } : b
                  )
                );
              }
            }}
          >
            {botao.letra}
          </button>
        ))}
      </div>
    </div>
  );
}

function gerarNumeroInteiroAleatorio(min, max) {
  const aleatorioFracionario = Math.random() * (max - min + 1);
  // número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
  // Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
  const aleatorioInteiro = Math.trunc(aleatorioFracionario);
  // número inteiro aleatório maior ou igual a min e menor ou igual a max
  return min + aleatorioInteiro;
}

function escolherElementoAleatorio(array) {
  return array[gerarNumeroInteiroAleatorio(0, array.length - 1)];
}
export default App;
