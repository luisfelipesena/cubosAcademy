const Router = require('koa-router');

const router = new Router();

const Auth = require('./controllers/auth');
const Autores = require('./controllers/autores');
const Payments = require('./controllers/payment');
const Posts = require('./controllers/posts');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');

router.post('/auth', Auth.autenticar);

router.post('/payment', Session.verify, Payments.payment);

router.get('/autor', Autores.obterAutores);
router.get('/confirmacao', Autores.confirmarCadastro);
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
