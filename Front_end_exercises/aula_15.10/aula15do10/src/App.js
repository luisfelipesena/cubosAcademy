import React from "react";
import "./App.css";

//Questão 1
// const paises = [
//   {
//     pais: "Hong Kong",
//     link: "http://www.startupshk.com/wp-content/uploads/2013/03/Untitled-1.jpg",
//   },
//   {
//     pais: "Singapura",
//     link:
//       "http://s1.picswalls.com/wallpapers/2014/08/08/singapore-wallpaper_02072513_173.jpg",
//   },
//   {
//     pais: "Japão",
//     link:
//       "https://lonelyplanetstatic.imgix.net/op-video-sync/images/production/p-5541832440001-brightcove-introducing-japan-20170922-054806.jpg",
//   },
//   {
//     pais: "Las Vegas",
//     link: "https://wallpapercave.com/wp/vyuzyyL.jpg",
//   },
// ];

// function App() {
//   const [imagem, setImagem] = React.useState(paises[0]);

//   return (
//     <div className="App">
//       <div className="mainDiv">
//         <img className="mainImg" src={imagem.link} alt="Hong Kong"></img>
//         <div>{imagem.pais}</div>
//       </div>
//       <div>
//         <ul>
//           {paises.map((i) => (
//             <li
//               className={imagem.link === i.link ? "clicado" : ""}
//               onClick={() => {
//                 i.clicado = true;
//                 setImagem(i);
//               }}
//             >
//               <img alt={i.pais} src={i.link}></img>
//               <div>{i.pais}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//Questão 2

// const fazerFetch = (url) => fetch(url).then((res) => res.json());
// const estadoSigla = {
//   Acre: "AC",
//   Alagoas: "AL",
//   Amapá: "AP",
//   Amazonas: "AM",
//   Bahia: "BA",
//   Ceará: "CE",
//   "Distrito Federal": "DF",
//   "Espírito Santo": "ES",
//   Goiás: "GO",
//   Maranhão: "MA",
//   "Mato Grosso": "MT",
//   "Mato Grosso do Sul": "MS",
//   "Minas Gerais": "MG",
//   Pará: "PA",
//   Paraíba: "PB",
//   Paraná: "PR",
//   Pernambuco: "PE",
//   Piauí: "PI",
//   "Rio de Janeiro": "RJ",
//   "Rio Grande do Norte": "RN",
//   "Rio Grande do Sul": "RS",
//   Rondônia: "RO",
//   Roraima: "RR",
//   "Santa Catarina": "SC",
//   "São Paulo": "SP",
//   Sergipe: "SE",
//   Tocantins: "TO",
// };

// function App() {
//   const [cidade, setCidade] = React.useState(null);
//   const [estado, setEstado] = React.useState(null);
//   const [dadosCovid, setDadosCovid] = React.useState(null);

//   React.useEffect(() => {
//     fazerFetch("https://extreme-ip-lookup.com/json/").then((dados) => {
//       setCidade(dados.city);
//       setEstado(dados.region);
//       fazerFetch(
//         `https://brasil.io/api/dataset/covid19/caso/data/?format=json&city=${
//           dados.city
//         }&state=${estadoSigla[dados.region]}`
//       ).then((covid) => setDadosCovid(covid));
//     });
//   }, []);

//   return (
//     <div className="App">
//       <h1>
//         Casos confirmados de COVID-19 em
//         {!cidade ? " Carregando" : ` ${cidade}`}
//         {!estado ? "" : `, ${estado}`}
//       </h1>
//       <h2 className="ultimo">
//         {!dadosCovid ? "Carregando" : dadosCovid.results[0].confirmed}
//       </h2>
//       <ul>
//         {!dadosCovid
//           ? "Carregando"
//           : dadosCovid.results.map((item) => (
//               <li>
//                 <div className="dia">
//                   {item.date.split("-").reverse().join("/")}
//                 </div>
//                 <div>{item.confirmed}</div>
//               </li>
//             ))}
//       </ul>
//     </div>
//   );
// }

// Questão 3
// const tabela = [
//   {
//     time: "Flamengo - RJ",
//     pontos: 90,
//     jogos: 38,
//     vitorias: 28,
//     empates: 6,
//     derrotas: 4,
//   },
//   {
//     time: "Santos - SP",
//     pontos: 74,
//     jogos: 38,
//     vitorias: 22,
//     empates: 8,
//     derrotas: 8,
//   },
//   {
//     time: "Palmeiras - SP",
//     pontos: 74,
//     jogos: 38,
//     vitorias: 21,
//     empates: 11,
//     derrotas: 6,
//   },
//   {
//     time: "Grêmio - RS",
//     pontos: 65,
//     jogos: 38,
//     vitorias: 19,
//     empates: 8,
//     derrotas: 11,
//   },
//   {
//     time: "Athletico Paranaense - PR",
//     pontos: 64,
//     jogos: 38,
//     vitorias: 18,
//     empates: 10,
//     derrotas: 10,
//   },
//   {
//     time: "São Paulo - SP",
//     pontos: 63,
//     jogos: 38,
//     vitorias: 17,
//     empates: 12,
//     derrotas: 9,
//   },
//   {
//     time: "Internacional - RS",
//     pontos: 57,
//     jogos: 38,
//     vitorias: 16,
//     empates: 9,
//     derrotas: 13,
//   },
//   {
//     time: "Corinthians - SP",
//     pontos: 56,
//     jogos: 38,
//     vitorias: 14,
//     empates: 14,
//     derrotas: 10,
//   },
//   {
//     time: "Fortaleza - CE",
//     pontos: 53,
//     jogos: 38,
//     vitorias: 15,
//     empates: 8,
//     derrotas: 15,
//   },
//   {
//     time: "Goiás - GO",
//     pontos: 52,
//     jogos: 38,
//     vitorias: 15,
//     empates: 7,
//     derrotas: 16,
//   },
//   {
//     time: "Bahia - BA",
//     pontos: 49,
//     jogos: 38,
//     vitorias: 12,
//     empates: 13,
//     derrotas: 13,
//   },
//   {
//     time: "Vasco da Gama - RJ",
//     pontos: 49,
//     jogos: 38,
//     vitorias: 12,
//     empates: 13,
//     derrotas: 13,
//   },
//   {
//     time: "Atlético - MG",
//     pontos: 48,
//     jogos: 38,
//     vitorias: 13,
//     empates: 9,
//     derrotas: 16,
//   },
//   {
//     time: "Fluminense - RJ",
//     pontos: 46,
//     jogos: 38,
//     vitorias: 12,
//     empates: 10,
//     derrotas: 16,
//   },
//   {
//     time: "Botafogo - RJ",
//     pontos: 43,
//     jogos: 38,
//     vitorias: 13,
//     empates: 4,
//     derrotas: 21,
//   },
//   {
//     time: "Ceará - CE",
//     pontos: 39,
//     jogos: 38,
//     vitorias: 10,
//     empates: 9,
//     derrotas: 19,
//   },
//   {
//     time: "Cruzeiro - MG",
//     pontos: 36,
//     jogos: 38,
//     vitorias: 7,
//     empates: 15,
//     derrotas: 16,
//   },
//   {
//     time: "Csa - AL",
//     pontos: 32,
//     jogos: 38,
//     vitorias: 8,
//     empates: 8,
//     derrotas: 22,
//   },
//   {
//     time: "Chapecoense - SC",
//     pontos: 32,
//     jogos: 38,
//     vitorias: 7,
//     empates: 11,
//     derrotas: 20,
//   },
//   {
//     time: "Avaí - SC",
//     pontos: 20,
//     jogos: 38,
//     vitorias: 3,
//     empates: 11,
//     derrotas: 24,
//   },
// ];

// function App() {
//   const [tabelaOrdenada, setTabelaOrdenada] = React.useState(tabela);
//   const [botoesOrdem, setBotaoOrdem] = React.useState([
//     "⬇",
//     "⬇",
//     "⬇",
//     "⬇",
//     "⬇",
//     "⬇",
//   ]);

//   return (
//     <div className="App">
//       <table>
//         <tr className="cabecalho">
//           <th>Posição</th>
//           <th>
//             Time
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[0] === "⬇") {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => a.time.localeCompare(b.time))
//                   );
//                   newBotoes[0] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => b.time.localeCompare(a.time))
//                   );
//                   newBotoes[0] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[0]}
//             </button>
//           </th>
//           <th>
//             Pontos
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[1] === "⬇") {
//                   setTabelaOrdenada(tabela.sort((a, b) => a.pontos - b.pontos));
//                   newBotoes[1] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   setTabelaOrdenada(tabela.sort((a, b) => b.pontos - a.pontos));
//                   newBotoes[1] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[1]}
//             </button>
//           </th>
//           <th>
//             Jogos
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[2] === "⬇") {
//                   newBotoes[2] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   newBotoes[2] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[2]}
//             </button>
//           </th>
//           <th>
//             Vitórias{" "}
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[3] === "⬇") {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => a.vitorias - b.vitorias)
//                   );
//                   newBotoes[3] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => b.vitorias - a.vitorias)
//                   );
//                   newBotoes[3] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[3]}
//             </button>
//           </th>
//           <th>
//             Empates{" "}
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[4] === "⬇") {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => a.empates - b.empates)
//                   );
//                   newBotoes[4] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => b.empates - a.empates)
//                   );
//                   newBotoes[4] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[4]}
//             </button>
//           </th>
//           <th>
//             Derrotas{" "}
//             <button
//               onClick={() => {
//                 const newBotoes = [...botoesOrdem];
//                 if (botoesOrdem[5] === "⬇") {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => a.derrotas - b.derrotas)
//                   );
//                   newBotoes[5] = "⬆";
//                   setBotaoOrdem(newBotoes);
//                 } else {
//                   setTabelaOrdenada(
//                     tabela.sort((a, b) => b.derrotas - a.derrotas)
//                   );
//                   newBotoes[5] = "⬇";
//                   setBotaoOrdem(newBotoes);
//                 }
//               }}
//             >
//               {botoesOrdem[5]}
//             </button>
//           </th>
//         </tr>

//         {tabelaOrdenada.map((time, i) => (
//           <tr>
//             <td>{i + 1}</td>
//             <td>{time.time}</td>
//             <td>{time.pontos}</td>
//             <td>{time.jogos}</td>
//             <td>{time.vitorias}</td>
//             <td>{time.empates}</td>
//             <td>{time.derrotas}</td>
//           </tr>
//         ))}
//       </table>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <h1>Previsão do tempo em </h1>
    </div>
  );
}

export default App;
