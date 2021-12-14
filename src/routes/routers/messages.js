const { Router } = require("express");
const router = Router();
const { Message } = require("../../db");

router.post("/", async (req, res, next) => {
  const { conversationId, sender, text } = req.body;
  try {
    const newMessage = await Message.create({
      conversationId: conversationId,
      sender: sender,
      text: text,
    });
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

router.get("/:conversationId", async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.findAll({
      where: { conversationId: conversationId },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
