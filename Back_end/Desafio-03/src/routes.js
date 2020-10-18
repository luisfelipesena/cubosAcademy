const Router = require('koa-router');

const router = new Router();

const BrasileiraoController = require('./controllers/brasileirao');
const AutenticarController = require('./controllers/auth');

const SessionMiddleware = require('./middlewares/session');

router.post('/auth', AutenticarController.autenticar);

router.get('/classificacao', BrasileiraoController.obterClassificacao);
router.get('/jogos/:rodada', BrasileiraoController.obterJogosRodada);

router.post('/jogos', SessionMiddleware.verificar, BrasileiraoController.editarPlacar);

module.exports = router;
