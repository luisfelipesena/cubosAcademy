const Router = require("koa-router");
const router = new Router();

const Localidades = require("./controllers/localidades");

router.get("/localidades", Localidades.obterLocalidades);
router.get("/localidades/:id", Localidades.obterLocalidade);
router.put("/localidades/:id", Localidades.atualizarLocalidade);
router.post("/localidades", Localidades.adicionarLocalidade);
router.delete("/localidades/:id", Localidades.deletarLocalidade);
router.delete("/localidades", Localidades.dropTable);
module.exports = router;
