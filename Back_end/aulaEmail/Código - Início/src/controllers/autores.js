const response = require('./response');
const Autores = require('../repositories/autores');
const Posts = require('../repositories/posts');
const { enviarEmail } = require('../utils/email');

const obterAutores = async (ctx) => {
	const result = await Autores.obterAutores();
	return response(ctx, 200, result);
};

const obterAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const result = await Autores.obterAutor(id);
		if (result) {
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Autor não encontrado' });
	}

	return response(ctx, 400, { message: 'Mal formatado' });
};

const adicionarAutor = async (ctx) => {
	const { nome = null, sobrenome = null, email = null } = ctx.request.body;
	ctx.state.email = email;
	const { hash } = ctx.state;
	if (!nome || !sobrenome || !email) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existencia = await Autores.obterAutorPorEmail(email);

	if (existencia) {
		return response(ctx, 400, { message: 'Autor já existente' });
	}

	const autor = {
		nome,
		sobrenome,
		email,
		senha: hash,
	};

	const result = await Autores.adicionarAutor(autor);

	await enviarEmail(
		email,
		'Cadastro na Cubos Academy Blogosfera',
		`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
		<head>
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Actionable emails e.g. reset password</title>
		
		
		<style type="text/css">
		img {
		max-width: 100%;
		}
		body {
		-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
		}
		body {
		background-color: #f6f6f6;
		}
		@media only screen and (max-width: 640px) {
		  body {
			padding: 0 !important;
		  }
		  h1 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h2 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h3 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h4 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h1 {
			font-size: 22px !important;
		  }
		  h2 {
			font-size: 18px !important;
		  }
		  h3 {
			font-size: 16px !important;
		  }
		  .container {
			padding: 0 !important; width: 100% !important;
		  }
		  .content {
			padding: 0 !important;
		  }
		  .content-wrap {
			padding: 10px !important;
		  }
		  .invoice {
			width: 100% !important;
		  }
		}
		</style>
		</head>
		
		<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
		
		<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
				<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
					<div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
						<table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
									<meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												Please confirm your email address by clicking the link below.
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
										...
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												<a href="http://localhost:8081/confirmacao" class="btn-primary" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Confirm email address</a>
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												&mdash; The Mailgunners
											</td>
										</tr></table></td>
							</tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
							<table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Follow <a href="http://twitter.com/mail_gun" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">@Mail_Gun</a> on Twitter.</td>
								</tr></table></div></div>
				</td>
				<td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
			</tr></table></body>
		</html>`
	);

	await enviarEmail(
		email,
		'Verificar Email',
		`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
		<head>
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Actionable emails e.g. reset password</title>
		
		
		<style type="text/css">
		img {
		max-width: 100%;
		}
		body {
		-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
		}
		body {
		background-color: #f6f6f6;
		}
		@media only screen and (max-width: 640px) {
		  body {
			padding: 0 !important;
		  }
		  h1 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h2 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h3 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h4 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h1 {
			font-size: 22px !important;
		  }
		  h2 {
			font-size: 18px !important;
		  }
		  h3 {
			font-size: 16px !important;
		  }
		  .container {
			padding: 0 !important; width: 100% !important;
		  }
		  .content {
			padding: 0 !important;
		  }
		  .content-wrap {
			padding: 10px !important;
		  }
		  .invoice {
			width: 100% !important;
		  }
		}
		</style>
		</head>
		
		<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
		
		<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
				<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
					<div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
						<table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
									<meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												Please verify your email address by clicking the link below.
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
										...
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												<a href="http://localhost:8081/confirmacao" class="btn-primary" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Confirm email address</a>
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												&mdash; The Mailgunners
											</td>
										</tr></table></td>
							</tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
							<table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Follow <a href="http://twitter.com/mail_gun" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">@Mail_Gun</a> on Twitter.</td>
								</tr></table></div></div>
				</td>
				<td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
			</tr></table></body>
		</html>`
	);

	return response(ctx, 201, result);
};

const confirmarCadastro = async (ctx) => {
	await enviarEmail(
		'ff390b770f-59ebce@inbox.mailtrap.io',
		'Confirmação  Cadastro na Cubos Academy Blogosfera',
		`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
		<head>
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Actionable emails e.g. reset password</title>
		
		
		<style type="text/css">
		img {
		max-width: 100%;
		}
		body {
		-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
		}
		body {
		background-color: #f6f6f6;
		}
		@media only screen and (max-width: 640px) {
		  body {
			padding: 0 !important;
		  }
		  h1 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h2 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h3 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h4 {
			font-weight: 800 !important; margin: 20px 0 5px !important;
		  }
		  h1 {
			font-size: 22px !important;
		  }
		  h2 {
			font-size: 18px !important;
		  }
		  h3 {
			font-size: 16px !important;
		  }
		  .container {
			padding: 0 !important; width: 100% !important;
		  }
		  .content {
			padding: 0 !important;
		  }
		  .content-wrap {
			padding: 10px !important;
		  }
		  .invoice {
			width: 100% !important;
		  }
		}
		</style>
		</head>
		
		<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
		
		<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
				<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
					<div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
						<table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
									<meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
										Parabéns! Agora você faz parte da maior plataforma de blogs dentro de Cubos Academy
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
										
											</td>
										</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
												&mdash; Cubos Academy
											</td>
										</tr></table></td>
							</tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
							<table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Follow <a href="http://twitter.com/mail_gun" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">@Mail_Gun</a> on Twitter.</td>
								</tr></table></div></div>
				</td>
				<td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
			</tr></table></body>
		</html>`
	);

	response(ctx, 200, 'Cadastrado com sucesso');
};

const atualizarAutor = async (ctx) => {
	const { id = null } = ctx.params;
	const { nome, sobrenome, email, senha } = ctx.request.body;

	if (!nome && !sobrenome && !email && !senha) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}

	if (id) {
		const autorAtual = await Autores.obterAutor(id);
		if (autorAtual) {
			const autorAtualizado = {
				...autorAtual,
				nome: nome ? nome : autorAtual.nome,
				sobrenome: sobrenome ? sobrenome : autorAtual.sobrenome,
				email: email ? email : autorAtual.email,
				senha: senha ? senha : autorAtual.senha,
			};

			const result = await Autores.atualizarAutor(autorAtualizado);
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Autor não encontrado' });
	}
	return response(ctx, 404, { message: 'Autor não encontrado' });
};

const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const autorAtual = await Autores.obterAutor(id);
		const postsAutor = await Posts.obterPostsDeAutor(id);
		if (autorAtual) {
			if (estado === true && postsAutor.length > 0) {
				return response(ctx, 403, { message: 'Ação proibida' });
			}

			const result = await Autores.deletarAutor(id, true);

			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Autor não encontrado' });
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
	confirmarCadastro,
};
