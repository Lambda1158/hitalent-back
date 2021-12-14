const { Review, Users, Posts,Orders } = require("../db");

async function createReview(req, res, next) {
  let { qualification, description, user_id, post_id } = req.body;

  let order=await Orders.findAll({where:{
      userId:user_id,
      postId:post_id
  }})
  if(order.length<1)return res.status(500).json({message:"no puedes hacer una review de una publicacion q no has comprado"})

  try {
    let newReview = await Review.create({
      description,
      qualification
    });

    let user =await Users.findByPk(user_id);
    if (!user.aprobado)return res.json({message:"usuario no aprobado"})

    let post =await  Posts.findByPk(post_id);
    await newReview.setUser(user);
    await newReview.setPost(post);


    if(post.rating===0){
        post.rating=Number(review.qualification)
        await post.save()
        return res.json(newReview)
    }
    post.rating=Number(Math.round((post.rating+Number(qualification))/2))
    await post.save()
    res.json(newReview)

    // let totalQual= await Review.findAll();
    // let posibleQuali= totalQual.length;
    // let count= 0;
    // totalQual.forEach(e => {
    //     count += Number(e.qualification)
    // });
    // let result= count / posibleQuali
    // result= result.toString()
    // if(result.length > 4) result= result.slice(0,3)
    // result= Number(result)
    // await Posts.update({
    //   rating: result
    // })
    // res.json(newReview);
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res) {
  let { idReview } = req.params;
  try {
    Review.destroy({
      where: {
        id: idReview,
      },
    });
    res.status(200).send("Review eliminado");
  } catch (err) {
    next(err);
  }
}

async function updateReview(req, res, next) {
  let { idReview } = req.params;
  let { qualification, description } = req.body;
  try {
    let review = await Review.findByPk(idReview);
    if (qualification) review.qualification = qualification;
    if (description) review.description = description;
    review.save();
    res.json(review);
  } catch (err) {
    next(err);
  }
}

async function getAllReviewsUser(req, res, next) {
  let { idUser } = req.params;
  try {
    let allReviews = await Users.findOne({
      where: {
        id: idUser,
      },
      attributes: { exclude: ["user_id", "post_id", "updatedAt"] },
      include: [
        {
          model: Posts,
          attributes: ["id", "title"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Review,
              attributes: ["qualification", "description"],
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
    res.json(allReviews);
  } catch (err) {
    next(err);
  }
}

async function getPostReview(req, res, next) {
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
            model: Review,
            attributes: ["qualification", "description"],
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: Users,
                attributes: ["username"],
              },
            ],
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
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsUser,
  getPostReview
};
