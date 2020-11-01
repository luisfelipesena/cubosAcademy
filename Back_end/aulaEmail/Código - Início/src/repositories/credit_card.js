/* eslint-disable camelcase */
const database = require('../utils/database');

const salvarCartao = async (cartao) => {
	const {
		autor_id,
		first_digits,
		last_digits,
		card_hash,
		brand,
		holder_name,
	} = cartao;
	const query = {
		text: `INSERT INTO credit_cards (
		autor_id,
		first_digits,
		last_digits,
		card_hash,
		brand,
		holder_name
	) VALUES ($1, $2, $3, $4, $5, $6)`,
		values: [
			autor_id,
			first_digits,
			last_digits,
			card_hash,
			brand,
			holder_name,
		],
	};

	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = { salvarCartao };
