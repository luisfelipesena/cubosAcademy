const Router = require('koa-router');
const router = new Router();

const funcoesAutores = require('./controllers/funcoesAutores');
const funcoesPosts = require('./controllers/funcoesPosts');

router.get('/autor', funcoesAutores.obterAutores);
router.get('/autor/:id', funcoesAutores.obterAutor);
router.post('/autor', funcoesAutores.adicionarAutor);
router.put('/autor', funcoesAutores.atualizarAutor);
router.delete('/autor', funcoesAutores.deletarAutor);

router.get('/posts', funcoesPosts.obterPosts);
router.get('/posts/:id', funcoesPosts.obterPost);
router.post('/posts', funcoesPosts.adicionarPost);
router.put('/posts', funcoesPosts.atualizarPost);
router.delete('/posts', funcoesPosts.deletarPost);

module.exports = router;
