const db = require("../utils/database");

const obterLocalidades = async () => {
  const query = `SELECT * FROM localidades`;
  const result = await db.query(query);
  return result.rows;
};

const obterLocalidade = async (id = null) => {
  const query = {
    text: `SELECT * FROM localidades
		WHERE id=$1`,
    values: [id],
  };
  const result = await db.query(query);
  return result.rows.shift();
};

const atualizarLocalidade = async (id, param, valorParam) => {
  const query = {
    text: `UPDATE localidades
		SET ${param}=$1
		WHERE id=$2 RETURNING *`,
    values: [valorParam, id],
  };
  const result = await db.query(query);
  return result.rows.shift();
};

const adicionarLocalidade = async (nome, mesorregiao, descricao) => {
  const query = {
    text: `INSERT INTO localidades
		(nome,mesorregiao,descricao)
		VALUES($1,$2,$3) RETURNING *`,
    values: [nome, mesorregiao, descricao],
  };
  const result = await db.query(query);
  return result.rows.shift();
};

const deletarLocalidade = async (id) => {
  const query = {
    text: `DELETE FROM localidades
		WHERE id=$1 RETURNING *`,
    values: [id],
  };
  const result = await db.query(query);
  return result.rows.shift();
};

const obterLocalidadesQuery = async (param, valorParam) => {
  const query = {
    text: `SELECT * FROM localidades
		WHERE ${param}=$1`,
    values: [valorParam],
  };
  const result = await db.query(query);
  return result.rows;
};

module.exports = {
  obterLocalidades,
  adicionarLocalidade,
  obterLocalidade,
  atualizarLocalidade,
  deletarLocalidade,
  obterLocalidadesQuery,
};
