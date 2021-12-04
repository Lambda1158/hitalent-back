const { Router } = require("express");
const {
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsUser,
  getPostReview,
} = require("../../controllers/reviewLogic");
const router = Router();

router.post("/", createReview);
router.delete("/:idReview", deleteReview);
router.put("/:idReview", updateReview);
router.get("/all/:idUser", getAllReviewsUser);
router.get("/:idPost", getPostReview);

module.exports = router;
