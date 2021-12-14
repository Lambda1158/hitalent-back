const { Router } = require("express");
// Importar todos los routers;
const routerUser = require("./routers/user");
const routerPost = require("./routers/post");
const routerCategories = require("./routers/categories");
const routerReviews = require("./routers/review");
const routerQuestion = require("./routers/question");
const routerAdmin=require("./routers/admin")
const routerOrden = require("./routers/orden");
const routerFavorites = require("./routers/favorites");
const routerCheckout = require("./routers/checkout");
const routerConversation = require("./routers/conversation");
const routerMessages = require("./routers/messages");
const router = Router();

// Configurar los routers

router.use("/user", routerUser);
router.use("/post", routerPost);
router.use("/categories", routerCategories);
router.use("/review", routerReviews);
router.use("/question", routerQuestion);
router.use("/admin",routerAdmin)
router.use("/orden", routerOrden);
router.use("/favorites", routerFavorites);
router.use("/checkout", routerCheckout);
router.use("/conversation", routerConversation);
router.use("/messages", routerMessages);

module.exports = router;
