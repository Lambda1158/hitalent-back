const {Users,Posts,Favorites}=require("../db")

const getFavorites= async(req,res,next)=>{
    let username=req.params.username
    var favorites=await Favorites.findAll({
        include:[{
            model:Users,
            order: [['createdAt', 'DESC']]
        },
        {model:Posts,
        order: [['createdAt', 'DESC']]
        }
    ]})
    if(!favorites)return res.status(400).json({message:"favorios vacio"})
    let array= favorites.filter(e=>e.user.username===username)
    if(array.length<1)return res.status(400).json({message:"no se encontro favoritos"})
    res.json(array)
}

const deleteFavorites= async(req,res,next)=>{
    let id=req.params.id
    var favorito=await Favorites.findByPk(id)
    favorito.destroy()
    res.json(favorito)
}
const addFavorites= async(req,res,next)=>{
    let {username,post}=req.body
    try{
        var user=await Users.findOne({where:{username}})
        var favorito=await Favorites.create({
            description:"favoritos de "+username
        })
        await favorito.setUser(user)
        await favorito.setPost(post)
    }catch(e){
        res.status(500).json({message:"algo salio mal",error:e.message})
    }
    res.json(favorito)
}

module.exports={
    getFavorites,
    deleteFavorites,
    addFavorites
}