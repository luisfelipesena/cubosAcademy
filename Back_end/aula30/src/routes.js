const Router = require('koa-routes');
const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');
const biblioteca = require('./repositories/biblioteca');

router.get('/autor', Autores.obterAutores);
router.get('/autor/:id', Autores.obterAutor);
router.post('/autor', Autores.adicionarAutor);
router.put('/autor/:id', Autores.atualizarAutor);
router.delete('/autor/:id', Autores.deletarAutor);

router.get('/posts', Posts.obterPosts);
router.get('/posts/:id', Posts.obterPost);
router.post('/posts', Posts.adicionarPost);
router.put('/posts/:id', Posts.atualizarPost);
router.delete('/posts/:id', Posts.deletarPost);

router.delete('/autor/table', biblioteca.dropAutores);
router.delete('/posts/table', biblioteca.dropPosts);
module.exports = router;
