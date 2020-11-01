const jwt = require('jsonwebtoken');
const response = require('../controllers/response');

require('dotenv').config();

const verify = async (ctx, next) => {
	// eslint-disable-next-line no-unused-vars
	const { authorization = null } = ctx.headers;
	if (authorization) {
		const [, token] = authorization.split(' ');
		if (token !== 'undefined') {
			try {
				const verification = await jwt.verify(
					token,
					process.env.JWT_SECRET
				);

				ctx.state.userId = verification.id;
				ctx.state.email = verification.email;
			} catch (err) {
				console.log(err);
				return response(ctx, 403, 'Ação proibida');
			}

			return next();
		}
	}

	return response(ctx, 403, 'Ação proibida');
};

module.exports = { verify };
