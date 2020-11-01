const pagarme = require('../utils/pagarme');
const Autores = require('../repositories/autores');
const Cartao = require('../repositories/credit_card');
const response = require('./response');

const payment = async (ctx) => {
	const {
		value = 100,
		cardHolderName,
		cardCvv,
		cardNumber,
		cardExpiration,
		authorId,
	} = ctx.request.body;
	const { userId } = ctx.state;
	const author = await Autores.obterAutor(authorId);
	console.log(author);
	if (author && author.deletado === false) {
		if (value >= 100) {
			const transaction = await pagarme.pay(value, {
				card_cvv: cardCvv,
				card_number: cardNumber,
				card_expiration_date: cardExpiration,
				card_holder_name: cardHolderName,
			});

			if (transaction.status === 'error') {
				return response(ctx, 400, 'Ação mal formatada');
			}

			await Autores.atualizarSaldo(authorId, value);
			await Cartao.salvarCartao({
				autor_id: userId,
				first_digits: transaction.card.first_digits,
				last_digits: transaction.card.last_digits,
				card_hash: transaction.card.id,
				brand: transaction.card.brand,
				holder_name: transaction.card.holder_name,
			});

			return response(ctx, 200, { mensagem: 'Transação com sucesso!' });
		}
	}
};

module.exports = { payment };
