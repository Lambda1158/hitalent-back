const { Users, Question, Posts } = require("../db");

async function question(req, res, next) {
  console.log("probando ruta", req.body);
  let { title, question, user_id, post_id } = req.body;
  try {
    let newQuestion = await Question.create({
      title,
      question,
      user_id,
      post_id,
    });
    newQuestion.setUser(user_id);
    newQuestion.setPost(post_id);
    res.send(newQuestion);
  } catch (err) {
    next(err);
  }
}
async function answer(req, res, next) {
  let { answer, idQuestion } = req.body;
  console.log("probando puuuuuuuut", req.body);
  try {
    let newAnswer = await Question.findByPk(idQuestion);
    newAnswer.answer = answer;
    newAnswer.save();
    res.json(newAnswer);
  } catch (err) {
    next(err);
  }
}

async function deleteQuestion(req, res) {
  let { idQuestion } = req.params;
  try {
    Question.destroy({
      where: {
        id: idQuestion,
      },
    });
    res.status(200).send("Question eliminada");
  } catch (err) {
    next(err);
  }
}

async function getAllQuestions(req, res, next) {
  let { idUser } = req.params;
  try {
    let allQuestions = await Users.findOne({
      where: {
        id: idUser,
      },
      attributes: { exclude: ["user_id", "post_id", "updatedAt"] },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Posts,
          attributes: ["id", "title"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Question,
              attributes: ["title", "question", "answer", "id"],
              order: [["createdAt", "DESC"]],
              include: [
                {
                  model: Users,
                  attributes: ["username"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(allQuestions);
  } catch (err) {
    next(err);
  }
}

async function getPostQuestions(req, res, next) {
  // el id es el del POST,
  let { idPost } = req.params;
  if (idPost && idPost.length === 36) {
    // 36 es la length del UUID
    try {
      let foundPost = await Posts.findOne({
        where: {
          id: idPost,
        },
        attributes: ["id"],
        include: [
          {
            model: Question,
            attributes: ["title", "question", "answer", "userId"],
            order: [["createdAt", "DESC"]],
          },
        ],
      });
      if (foundPost) res.json(foundPost);
      else
        throw new Error(
          "ERROR 500: La publicación no fue encontrada en la base de datos (UUID no existe)."
        );
    } catch (err) {
      next(err);
    }
  }
  if (idPost && idPost.length !== 36) {
    try {
      throw new TypeError(
        "ERROR 404: ID inválido (ID no es un tipo UUID válido)."
      ); // automaticamente rechaza un error, sin buscar por la DB
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  question,
  answer,
  deleteQuestion,
  getAllQuestions,
  getPostQuestions,
};
