const { Router } = require("express");
const router = Router();
const { getFavorites,deleteFavorites,addFavorites } = require("../../controllers/favoritesLogic");

router.get("/:username",getFavorites)
router.delete("/:id",deleteFavorites)
router.post("/",addFavorites)

module.exports = router;