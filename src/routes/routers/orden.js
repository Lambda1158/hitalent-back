const { Router } = require("express");
const router = Router();
const { getOrdenbyId, editOrden, cancelOrden, createOrden, getAllOrden, getVentas } = require("../../controllers/ordenLogic");


router.get("/",getAllOrden)
router.get("/:id",getOrdenbyId)
router.post("/",createOrden)
router.put("/:id",editOrden)
router.delete("/:id",cancelOrden)
router.get("/ventas",getVentas)

module.exports = router;