const Router = require('koa-router');
const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');
const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');

router.post('/auth', Auth.autenticar);

router.get('/autor', Autores.obterAutores);
router.get('/autor/:id', Autores.obterAutor);
router.post('/autor', Password.encrypt, Autores.adicionarAutor);
router.put('/autor/:id', Session.verify, Autores.atualizarAutor);
router.delete('/autor/:id', Session.verify, Autores.deletarAutor);

router.get('/posts', Session.verify, Posts.obterPosts);
router.get('/posts/:id', Session.verify, Posts.obterPost);
router.post('/posts', Session.verify, Posts.adicionarPost);
router.put('/posts/:id', Session.verify, Posts.atualizarPost);
router.delete('/posts/:id', Session.verify, Posts.deletarPost);

module.exports = router;
