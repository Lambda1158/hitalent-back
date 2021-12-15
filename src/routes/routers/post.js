const { Router } = require("express");
const router = Router();
const {
  getPosts,
  updatePost,
  createPost,
  deletePost,
  addImage,
  deleteImage,
  getPostId,
  getTalentsByTitle,
  getTalentosporRating,
} = require("../../controllers/postLogic");
const { uploader } = require("../../middleware/uploader");

router.get("/rating/:modo", getTalentosporRating);
router.get("/", getPosts);
router.post("/", uploader.single("image"), createPost);
router.put("/", updatePost);
router.delete("/", deletePost);
router.put("/image", uploader.single("image"), addImage);
router.delete("/image", deleteImage);
router.get("/:id", getPostId);
router.get("/title/:title", getTalentsByTitle);

module.exports = router;
