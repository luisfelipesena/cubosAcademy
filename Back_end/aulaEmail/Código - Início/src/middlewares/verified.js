const response = require('../controllers/response');

const verificarEmail = (ctx, next) => {
	const { email } = ctx.state;
	if (!email) {
		response(ctx, 403, 'Email não verificado');
		return;
	}

	return next();
};

module.exports = verificarEmail;
