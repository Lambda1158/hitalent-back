const { Router } = require("express");
const router = Router();
const { getOrdenbyId, editOrden, cancelOrden, createOrden, getAllOrden, getVentas } = require("../../controllers/ordenLogic");


router.get("/",getAllOrden)
router.get("/:id",getOrdenbyId)
router.post("/",createOrden)
router.put("/",editOrden)
router.delete("/",cancelOrden)
router.get("/ventas/:id",getVentas)

module.exports = router;