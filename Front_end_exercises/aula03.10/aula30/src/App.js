import React from "react";
import "./App.css";

function App() {
  const [cores, mudarArrayCores] = React.useState([
    gerarCorAleatoria(),
    gerarCorAleatoria(),
    gerarCorAleatoria(),
  ]);
  const [corBackground, mudarCorBackground] = React.useState(
    escolherElementoAleatorio(cores)
  );
  return (
    <div className="App">
      <h1>Advinhe a cor!</h1>
      <div className="imagem" style={{ background: corBackground }}></div>
      <div>
        <button
          value={cores[0]}
          onClick={(ev) => {
            const novoArray = [
              gerarCorAleatoria(),
              gerarCorAleatoria(),
              gerarCorAleatoria(),
            ];
            mudarArrayCores([...novoArray]);
            mudarCorBackground(escolherElementoAleatorio(novoArray));
            //eslint-disable-next-line
            if (ev.target.value == corBackground) {
              alert("Acertou");
            } else {
              alert("Errou");
            }
          }}
        >
          {cores[0]}
        </button>
        <button
          value={cores[1]}
          onClick={(ev) => {
            const novoArray = [
              gerarCorAleatoria(),
              gerarCorAleatoria(),
              gerarCorAleatoria(),
            ];
            mudarArrayCores([...novoArray]);
            mudarCorBackground(escolherElementoAleatorio(novoArray));
            //eslint-disable-next-line
            if (ev.target.value == corBackground) {
              alert("Acertou");
            } else {
              alert("Errou");
            }
          }}
        >
          {cores[1]}
        </button>
        <button
          value={cores[2]}
          onClick={(ev) => {
            const novoArray = [
              gerarCorAleatoria(),
              gerarCorAleatoria(),
              gerarCorAleatoria(),
            ];
            mudarArrayCores([...novoArray]);
            mudarCorBackground(escolherElementoAleatorio(novoArray));
            //eslint-disable-next-line
            if (ev.target.value == corBackground) {
              alert("Acertou");
            } else {
              alert("Errou");
            }
          }}
        >
          {cores[2]}
        </button>
      </div>
    </div>
  );
}

function gerarNumeroInteiroAleatorio(min, max) {
  // número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
  const aleatorioFracionario = Math.random() * (max - min + 1);
  // número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
  // Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
  const aleatorioInteiro = Math.trunc(aleatorioFracionario);
  // número inteiro aleatório maior ou igual a min e menor ou igual a max
  return min + aleatorioInteiro;
}

function gerarCorAleatoria() {
  const vermelho = gerarNumeroInteiroAleatorio(0, 255);
  const verde = gerarNumeroInteiroAleatorio(0, 255);
  const azul = gerarNumeroInteiroAleatorio(0, 255);

  return "rgb(" + vermelho + ", " + verde + ", " + azul + ")";
}

function escolherElementoAleatorio(array) {
  return array[gerarNumeroInteiroAleatorio(0, array.length - 1)];
}

export default App;
