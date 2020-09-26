const Router = require('koa-router');
const obterProduto = require('./controllers/funcoes').obterProduto;
const adicionarProduto = require('./controllers/funcoes').adicionarProduto;

const router = new Router();

/**
 * Rotas existentes
 */
router.post('/products', (ctx) => adicionarProduto(ctx));
// router.get('/products', obtemProdutos);
router.get('/products/:id', (ctx) => obterProduto(ctx));
// router.put('/products/:id', atualizarProduto);
// router.delete('/products/:id', deletarProduto);
module.exports = router;
