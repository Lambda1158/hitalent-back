const {Users,Posts,Review}=require("../db")
const {
  sendEmailUserApproved,
  getTemplateUserApproved,
  sendEmailUserDisapproved,
  getTemplateUserDisapproved,
  sendEmailReviewDestroy,
  getTemplateReviewDestroy,
  sendEmailPostDestroy,
  getTemplatePostDestroy,
} = require("../config/mail.config");

async function getAll(req,res,next){
    var users=await Users.findAll({include:[{model:Posts}]})
    var posts=await Posts.findAll({include:[{model:Users,attributes:["username","email"]}],raw:true})
    var review=await Review.findAll({include:[{model:Users,attributes:["username","email"]},{model:Posts,attributes:["title"]}],raw:true})
    res.json({users,posts,review})
}
async function aprobar(req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  if (name === "user") {
    var user = await Users.findByPk(id);
    if (!user)
      return res.status(400).json({ message: "usuario no encontrado" });
    user.aprobado = true;
    const template = getTemplateUserApproved();
    await sendEmailUserApproved(
      email,
      "¡Felicitaciones!¡Usuario aprobado con éxito!",
      template
    );
    await user.save();
    res.json(user);
  } else if (name === "review") {
    var review = await Review.findByPk(Number(id));
    if (!review)
      return res.status(400).json({ message: "review no encontrada" });
    review.aprobado = true;
    await review.save();
    res.json(review);
  } else {
    var post = await Posts.findByPk(id);
    if (!post) return res.status(400).json({ message: "post no encontrado" });
    post.aprobado = true;
    await post.save();
    res.json(post);
  }
}
async function deleteNoAprobado(req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  if (name === "user") {
    var user = await Users.findOne({ where: { id } });
    if (!user)
      return res.status(400).json({ message: "usuario no encontrado" });
    const template = sendEmailUserDisapproved();
    await getTemplateUserDisapproved(
      email,
      "Tu usuario aún no fue aprobado",
      template
    );
    try {
      // let post=await Posts.findAll({where:{user_id:id}})
      // if(post.length>=1){
      //   for(let i in post){
      //     await post[i].destroy()
      //   }
      // }
      // let review=await Review.findAll({where:{userId:id}})
      // if(review.length>=1){
      //   for(let i in review){
      //     await review[i].destroy()
      //   }
      // }
      await Posts.destroy({
        where: { user_id: id },
      });
      await Review.destroy({
        where: { userId: id },
      });
      await Users.destroy({
        where: { id },
      });
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  } else if (name === "review") {
    var review = await Review.findByPk(Number(id));
    if (!review)
      return res.status(400).json({ message: "review no encontrada" });
    const template = getTemplateReviewDestroy();
    await sendEmailReviewDestroy(email, "Tu reseña fue eliminada", template);
    await Review.destroy({
      // de existir, lo destruye
      where: {
        id: Number(id),
      },
    });
    res.json(review);
  } else {
    var post = await Posts.findByPk(id);
    if (!post) return res.status(400).json({ message: "post no encontrado" });
    const template = getTemplatePostDestroy();
    await sendEmailPostDestroy(email, "Tu reseña fue eliminada", template);
    await Posts.destroy({
      // de existir, lo destruye
      where: {
        id,
      },
    });
    res.json(post);
  }
}


module.exports={
    getAll,
    aprobar,
    deleteNoAprobado
}