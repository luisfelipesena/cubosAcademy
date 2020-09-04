const cidade = document.querySelector(".cidade");
const estado = document.querySelector(".estado");
const imagens = document.querySelectorAll("img");
const subtitulo = document.querySelectorAll(".subtitulo");
const descricoes = document.querySelectorAll(".descricao");
const minimo = document.querySelectorAll(".minimo");
const maximo = document.querySelectorAll(".maximo");

const previsaoDoTempo = (urlComIp) => {
    fetch(urlComIp).then(resposta => resposta.json())
    .then(respostaJson => {
        cidade.innerText = respostaJson.city;
        estado.innerText = `, ${respostaJson.region}`;
        const latitude = respostaJson.lat;
        const longitude = respostaJson.lon;
        return [latitude,longitude];
    })

    .then (arrayLatLon => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${arrayLatLon[0]}&lon=${arrayLatLon[1]}&units=metric&lang=pt_BR&appid=47b16d41765388e1d2e251b373b570c0`).then(resposta => resposta.json())
        .then(respostaJson => {
            for (let i = 0; i < 7; i++) { //dias da semana
                let id = respostaJson.daily[i].weather[0].icon;
                imagens[i].setAttribute("src",`http://openweathermap.org/img/wn/${id}@2x.png`);

                subtitulo[0].innerText = "Hoje";
                subtitulo[1].innerText = "Amanhã";
                if (i >= 2) {
                    subtitulo[i].innerText = `Daqui a ${i} dias`;
                }

                let descricao = `${respostaJson.daily[i].weather[0].description.slice(0,1).toUpperCase()}${respostaJson.daily[i].weather[0].description.slice(1)}`
                descricoes[i].innerText = `${descricao}\n`;

                let min = respostaJson.daily[i].temp.min;
                minimo[i].innerText = min;
                let max = respostaJson.daily[i].temp.max;
                maximo[i].innerText = `\n${max}`;
            }
        })
    })
}

previsaoDoTempo("https://extreme-ip-lookup.com/json/186.214.181.60");

