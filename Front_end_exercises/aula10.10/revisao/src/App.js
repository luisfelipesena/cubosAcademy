import React from "react";
import "./App.css";

//Questão 1
// function App() {
//   const [segundos, mudarSegundos] = React.useState(60);
//   React.useEffect(() => {
//     const id = setInterval(() => {
//       mudarSegundos((s) => {
//         if (s === 0) {
//           clearInterval(id);
//           return 0;
//         }
//         return s - 1;
//       });
//     }, 1000);
//   }, []);

//   return (
//     <div className="App">
//       <h1>Contagem regressiva</h1>
//       <span>
//         {segundos} {segundos === 1 ? "segundo" : "segundos"}
//       </span>
//     </div>
//   );
// }

const verificarGanhador = (linhas) => {
  for (let linha = 0; linha < 3; linha++) {
    if (
      linhas[linha][0] === linhas[linha][1] &&
      linhas[linha][1] === linhas[linha][2]
    ) {
      return linhas[linha][0];
    }
  }

  for (let linha = 0; linha < 3; linha++) {
    if (
      linhas[0][linha] === linhas[1][linha] &&
      linhas[1][linha] === linhas[2][linha]
    ) {
      return linhas[0][linha];
    }
  }

  if (linhas[0][0] === linhas[1][1] && linhas[1][1] === linhas[2][2]) {
    return linhas[0][0];
  } else {
    let x = 0;
    for (let linha = 0; linha < 3; linha++) {
      for (let item = 0; item < 3; item++) {
        if (linhas[linha][item] !== "") {
          x++;
        }
      }
    }
    if (x === 9) {
      return "empate";
    }
  }
  return null;
};

function App() {
  const [linhas, mudarLinhas] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [jogador, mudarJogador] = React.useState("x");

  React.useEffect(() => {
    const result = verificarGanhador(linhas);
    if (result) {
      alert(`${result} ${result === "empate" ? "" : "Ganhou"}`);
      mudarLinhas([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    }
  }, [linhas]);

  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      <table>
        {linhas.map((linha, indexLinha) => (
          <tr>
            {linha.map((item, indexItem) => (
              <td
                onClick={() => {
                  if (item !== "") return;
                  const novo = [...linhas];
                  novo[indexLinha][indexItem] = jogador;
                  mudarJogador(jogador === "x" ? "o" : "x");
                  mudarLinhas(novo);
                }}
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
