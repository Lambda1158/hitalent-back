const { Router } = require("express");
const router = Router();
const { getOrdenbyId, editOrden, cancelOrden, createOrden, getAllOrden } = require("../../controllers/ordenLogic");


router.get("/",getAllOrden)
router.get("/:id",getOrdenbyId)
router.post("/",createOrden)
router.put("/:id",editOrden)
router.delete("/:id",cancelOrden)


module.exports = router;