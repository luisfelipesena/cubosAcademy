const database = require("../repositories/requests");
const response = require("../utils/response");

const obterLocalidades = async (ctx) => {
  const { nome = null, mesorregiao = null, descricao = null } = ctx.query;
  if (!nome && !mesorregiao && !descricao) {
    const localidades = await database.obterLocalidades();
    if (localidades) {
      response(ctx, 200, localidades);
    } else {
      response(ctx, 404, "Localidades não encontradas");
    }
    return;
  }

  let result;
  if (nome) {
    result = await database.obterLocalidadesQuery("nome", nome);
  }
  if (mesorregiao) {
    result = await database.obterLocalidadesQuery("mesorregiao", mesorregiao);
  }
  if (mesorregiao) {
    result = await database.obterLocalidadesQuery("descricao", descricao);
  }
  response(ctx, 200, result);
};

const obterLocalidade = async (ctx) => {
  const { id } = ctx.params;
  if (Number(id)) {
    const localidade = await database.obterLocalidade(id);
    if (localidade) {
      response(ctx, 200, localidade);
    } else {
      response(ctx, 404, "Localidade não encontrada");
    }
  } else {
    response(ctx, 400, "Id não informado");
  }
};

const atualizarLocalidade = async (ctx) => {
  const { id = null } = ctx.params;
  const {
    nome = null,
    mesorregiao = null,
    descricao = null,
  } = ctx.request.body;

  if (!Number(id)) {
    response(ctx, 400, "Id Não Informado");
    return;
  }
  if (!nome && !mesorregiao && !descricao) {
    response(ctx, 403, "Ação não permitida");
    return;
  }

  let atualizado;
  if (nome) {
    atualizado = await database.atualizarLocalidade(id, "nome", nome);
  }
  if (mesorregiao) {
    atualizado = await database.atualizarLocalidade(
      id,
      "mesorregiao",
      mesorregiao
    );
  }
  if (descricao) {
    atualizado = await database.atualizarLocalidade(id, "descricao", descricao);
  }

  response(ctx, 200, atualizado);
};

const adicionarLocalidade = async (ctx) => {
  const {
    nome = null,
    mesorregiao = null,
    descricao = "Sem descrição",
  } = ctx.request.body;
  if (!nome || !mesorregiao) {
    response(ctx, 400, "Conteúdo mal formatado");
    return;
  }

  const localidades = await database.obterLocalidades();
  const novo = localidades.filter(
    (i) => nome == i.nome && mesorregiao == i.mesorregiao
  );

  if (novo.length !== 0) {
    response(ctx, 400, "Localidade já existente");
    return;
  }

  const result = await database.adicionarLocalidade(
    nome,
    mesorregiao,
    descricao
  );
  response(ctx, 201, result);
};

const deletarLocalidade = async (ctx) => {
  const { id } = ctx.params;
  if (Number(id)) {
    const deletado = await database.deletarLocalidade(id);
    if (deletado) {
      response(ctx, 200, deletado);
    } else {
      response(ctx, 404, "Localidade não encontrada");
    }
  } else {
    response(ctx, 400, "Id não informado");
  }
};

const dropTable = async (ctx) => {
  const drop = require("../utils/schema").drop;
  const result = drop("localidades");
  result !== undefined
    ? response(ctx, 200, "Tabela Deletada")
    : response(ctx, 404, "Tabela não encontrada");
};

module.exports = {
  obterLocalidades,
  adicionarLocalidade,
  obterLocalidade,
  atualizarLocalidade,
  deletarLocalidade,
  dropTable,
};
