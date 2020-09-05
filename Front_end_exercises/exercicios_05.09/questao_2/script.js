const cidade = document.querySelector(".cidade");
const estado = document.querySelector(".estado");
const ultimo = document.querySelector(".ultimo");
const lista = document.querySelector("ol");

const funcaoFetch = (url) => fetch(url).then(resposta => resposta.json())

const estadoSigla = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amapá": "AP",
    "Amazonas": "AM",
    "Bahia": "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    "Pará": "PA",
    "Paraíba": "PB",
    "Paraná": "PR",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    "Rondônia": "RO",
    "Roraima": "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    "Sergipe": "SE",
    "Tocantins": "TO"
};

const formatarData = (data) => data.split("-").reverse().join("/")

const adicaoDeDados = (respostaJson) => {
    ultimo.innerText = respostaJson.results[0].confirmed;
    for (const item of respostaJson.results) {
        const li = document.createElement("li");
        const data = document.createElement("div");
        data.innerText = formatarData(item.date);
        data.classList.add("data");
        const numeroDeCasos = document.createElement("div");
        numeroDeCasos.innerText = item.confirmed;
        numeroDeCasos.classList.add("numeroDeCasos");
        li.append(data); li.append(numeroDeCasos);
        lista.append(li);
    }
}

const casosDeCovidPorCidade = (url) => {
    funcaoFetch(url).then(respostaJson => {
        const cidadeResposta = respostaJson.city;
        cidade.innerText = cidadeResposta;
        const estadoResposta = respostaJson.region;
        estado.innerText = `, ${estadoResposta}`;
        const siglaEstado = estadoSigla[estadoResposta];
        return [cidadeResposta,siglaEstado]
    })

    .then(arrayCidadeEstado => {
        funcaoFetch(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&city=${arrayCidadeEstado[0]}&state=${arrayCidadeEstado[1]}`).then(respostaJson => {

            if (respostaJson.results[0].confirmed !== undefined) {
               adicaoDeDados(respostaJson);
            }

            else {
                funcaoFetch(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&place_type=state&state=${arrayCidadeEstado[1]}`).then(respostaJson2 => {
                    cidade.innerText = "";
                    estado.innerText = respostaJson.region;
                  adicaoDeDados(respostaJson2);
                })
            }

        }) 
    })
}

casosDeCovidPorCidade("https://extreme-ip-lookup.com/json/186.214.181.60");