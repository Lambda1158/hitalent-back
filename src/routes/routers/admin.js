const { Router } = require("express");
const router = Router();
const {getAll, aprobar, deleteNoAprobado}=require("../../controllers/adminLogic");

router.get("/",getAll)
router.put("/",aprobar)
router.delete("/",deleteNoAprobado)
module.exports = router;