//Questão 1a - Placar vôlei
const estado = {
  placar: { timeA: 40, timeB: 20 },
  contagemRegressiva: 600,
};

//Questão 1b - Forca
const estado = {
  palavra: "Arroz",
  letrasChutadas: [],
};

//Questão 1c - Previsão do tempo
const estado = {
  cidade: {
    latitude: 0,
    longitude: 0,
    nome: "Greenwich",
  },
  dias: [
    {
      id: 1,
      imagem: "url",
      descricao: "nublado",
      tempMax: 16.5,
      tempMin: 10,
    },
    {
      id: 2,
      imagem: "url",
      descricao: "nublado",
      tempMax: 19.5,
      tempMin: 15,
    },
  ],
};

//Questão 2
const estado = {
  tarefas: [],
  filtro: "todas",
};

const renderizarPagina = (estado) => {
  const tarefasAFazer = estado.tarefas.filter((tarefa) => !tarefa.completada);
  const tarefasCompletadas = estado.tarefas.filter(
    (tarefa) => tarefa.completada
  );
  document.body.innerHTML = `
  <h1>Tarefinhas 2.0</h1>

<div class="card">
	<form>
		<input id="checkbox-todos" type="checkbox" ${
      tarefasCompletadas.length === estado.tarefas.length &&
      estado.tarefas.length > 0
        ? "checked"
        : ""
    }>
	  <input id="input-tarefa" placeholder="O que precisa ser feito?">
	</form>

	<ul class="tarefas" id="a-fazer" ${estado.filtro === "feitas" ? "hidden" : ""}>
		${tarefasAFazer
      .map(
        (tarefa) =>
          `<li id="${tarefa.id}">
			<input type="checkbox">
			<span>${tarefa.nome}</span>
			<button>Deletar</button>
		</li> `
      )
      .join("")}
	</ul>

	<ul class="tarefas" id="feitas" ${estado.filtro === "a-fazer" ? "hidden" : ""}>
	${tarefasCompletadas
    .map(
      (tarefa) =>
        `<li id="${tarefa.id}">
			<input type="checkbox" checked>
			<span>${tarefa.nome}</span>
			<button>Deletar</button>
		</li> `
    )
    .join("")}
	</ul>

	<div class="rodape">
		<div id="contador">${tarefasAFazer.length} ${
    tarefasAFazer.length === 1 ? "item" : "itens"
  } a fazer</div>

		<div class="filtros">
			<button id="botao-todas" class="${
        estado.filtro === "todas" ? "ativo" : ""
      }">Todas</button>
			<button id="botao-a-fazer" class= ${
        estado.filtro === "a-fazer" ? "ativo" : ""
      }>A fazer</button>
			<button id="botao-feitas" class=${
        estado.filtro === "feitas" ? "ativo" : ""
      }>Completadas</button>
		</div>

		<div>
			<button id="botao-limpar">Limpar completadas</button>
		</div>
	</div>
</div>
`;

  const input = document.querySelector("#input-tarefa");
  document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    estado.tarefas.push({
      ["completada"]: false,
      ["nome"]: input.value,
      ["id"]: estado.tarefas.length + 1,
    });
    renderizarPagina(estado);
  });

  const tarefas = document.querySelectorAll(".tarefas li");
  tarefas.forEach((tarefa) => {
    const checkbox = tarefa.querySelector("input");
    const deletar = tarefa.querySelector("button");

    checkbox.addEventListener("input", () => {
      estado.tarefas.find((t) => t.id == tarefa.id).completada =
        checkbox.checked;
      renderizarPagina(estado);
    });

    deletar.addEventListener("click", () => {
      estado.tarefas.splice(
        estado.tarefas.findIndex((t) => t.id == tarefa.id),
        1
      );
      renderizarPagina(estado);
    });
  });

  const botao_todas = document.querySelector("#botao-todas");
  botao_todas.addEventListener("click", () => {
    estado.filtro = "todas";
    renderizarPagina(estado);
  });

  const botao_a_fazer = document.querySelector("#botao-a-fazer");
  botao_a_fazer.addEventListener("click", () => {
    estado.filtro = "a-fazer";
    renderizarPagina(estado);
  });

  const botao_feitas = document.querySelector("#botao-feitas");
  botao_feitas.addEventListener("click", () => {
    estado.filtro = "feitas";
    renderizarPagina(estado);
  });

  const limparCompletadas = document.querySelector("#botao-limpar");
  limparCompletadas.addEventListener("click", () => {
    estado.tarefas = estado.tarefas.filter((tarefa) => !tarefa.completada);
    renderizarPagina(estado);
  });

  const checkbox_todos = document.querySelector("#checkbox-todos");
  checkbox_todos.addEventListener("input", () => {
    estado.tarefas.forEach(
      (tarefa) => (tarefa.completada = checkbox_todos.checked)
    );
    renderizarPagina(estado);
  });
};

renderizarPagina(estado);
