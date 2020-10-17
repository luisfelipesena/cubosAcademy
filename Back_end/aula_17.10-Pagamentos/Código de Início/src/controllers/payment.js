const pagarme = require('../utils/pagarme');
const {
	salvarCartao,
	atualizarAutor,
	obterAutorPorEmail,
	salvarTransacao,
} = require('../repositories/autores');

const payment = async (ctx) => {
	const {
		value = 100,
		cardHolderName,
		cardCvv,
		cardNumber,
		cardExpiration,
	} = ctx.request.body;

	const { userId = null, email } = ctx.state;

	if (value >= 100 && userId) {
		const transaction = await pagarme.pay(value, {
			card_cvv: cardCvv,
			card_number: cardNumber,
			card_expiration_date: cardExpiration,
			card_holder_name: cardHolderName,
		});

		const autor = await obterAutorPorEmail(email);
		const result = await atualizarAutor(autor);
		await salvarCartao(autor, transaction);
		await salvarTransacao(transaction);
		console.log(transaction);
		ctx.body = result;
	}
};

module.exports = { payment };
