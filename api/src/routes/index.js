const { Router } = require("express");
// Importar todos los routers;
const routerUser = require("./routers/user");
const routerPost = require("./routers/post");
const routerCategories = require("./routers/categories");
const routerReviews = require("./routers/review");
const routerQuestion = require("./routers/question");
const routerOrden=require("./routers/orden")
const routerFavorites=require("./routers/favorites")
const router = Router();

// Configurar los routers

router.use("/user", routerUser);
router.use("/post", routerPost);
router.use("/categories", routerCategories);
router.use("/review", routerReviews);
router.use("/question", routerQuestion);
router.use("/orden",routerOrden)
router.use("/favorites",routerFavorites)
module.exports = router;
