const db = require('./database');
const { formatarTabela } = require('./tabela');
const fs = require('fs');
const util = require('util');
const lerArquivo = util.promisify(fs.readFile); // Para ler o arquivo sql que insere jogo a jogo nas tabelas criadas abaixo

/**
 * Tabelas relacionadas ao desafio
 */
const schema = {
	1: `CREATE TABLE IF NOT EXISTS jogos (
			id serial,
			time_casa varchar(255),
			time_visitante varchar(255),
			gols_casa int,
			gols_visitante int,
			rodada int
	);`,

	2: `CREATE TABLE IF NOT EXISTS users (
			id serial,
			email varchar(255),
			senha varchar(255)
	);`,

	3: `CREATE TABLE IF NOT EXISTS tabela (
		time varchar(255),
		jogos int not null default 0,
		pontos int not null default 0,
		empates int not null default 0,
		vitorias int not null default 0,
		derrotas int not null default 0,
		gols_feitos int not null default 0,
		gols_sofridos int not null default 0,
		saldo_de_gols int not null default 0
	);`,

	4: `CREATE TABLE IF NOT EXISTS times (
		id SERIAL,
		time varchar(255),
		link_imagem varchar(255)
	);`,
};

/**
 * Função exclusiva para que adiciona na tabela jogos um sql inserindo os dados jogo a jogo
 * e inseri na tabela times, o nome do time e seus respectivos links de logo
 * Para evitar duplicações, é necessário apagar a tabela e fazer uma reinserção
 */
const insertJogos = async () => {
	await drop('jogos').then(() => up(1));
	await drop('times').then(() => up(4));
	let sql = await lerArquivo('./jogos.sql');
	await db.query(sql.toString());
	sql = await lerArquivo('./linkImagens.sql');
	return db.query(sql.toString());
};

const up = async (number = null) => {
	if (!number) {
		for (const value in schema) {
			await db.query({ text: schema[value] });
		}
	} else {
		await db.query({ text: schema[number] });
	}
};

const drop = async (table = null) => {
	if (table) {
		const query = `DROP TABLE ${table} `;
		return db.query(query);
	}
};

/**
 * Caso queira criar as tabelas
 */
up()
	/**
	 * Caso queira inserir na tabela jogos o seu sql com jogo a jogo
	 */
	.then(() => insertJogos())

	/**
	 * Caso queira formatar a tabela e adicionar no banco de dados
	 */
	.then(() => formatarTabela());

/**
 * Caso queira deletar uma tabela específica
 */
// drop(nomeDaTabela)
