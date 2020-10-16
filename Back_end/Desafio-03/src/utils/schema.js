const db = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS XXX (
	XXX SERIAL
	XXX NUMBER DEFAULT 0
	XXX TEXT NOT NULL
	XXX TEXT NOT NULL
	)`,
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

module.exports = { up, drop };
