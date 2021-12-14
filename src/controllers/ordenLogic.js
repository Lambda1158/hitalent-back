const {Orders,Users,Posts,Payments}=require("../db")

const getAllOrden=async(req,res,next)=>{
    let allOrden=await Orders.findAll({
        include:[
            {model:Users,
            order: [['createdAt', 'DESC']]},
            {model:Posts,
            order: [['createdAt', 'DESC']]},
            {model:Payments}
        ]})
    if(!allOrden) return res.json({message:"no hay ordenes"})
    res.json(allOrden)
}
const getOrdenbyId= async(req,res,next)=>{
    let {id}=req.params

    var order=await Orders.findAll({
        where:{id},
        include: [
            {model: Users,
            order: [['createdAt', 'DESC']]
        },
            {model:Posts,
             order: [['createdAt', 'DESC']]    
            },
            {model:Payments}
        ]
    })
    if(!order)return res.status(500).json({message:"orden no encontrada"})
    res.json(order)
   
}
const createOrden= async(req,res,next)=>{
    var carrito=req.body.carrito
    var ordenes=[]
    for(let i in carrito){
        let { user_id, post_id, title, price } = carrito[i];
        try {
            let newOrder = await Orders.create({
                title,
                price:Number(price)
            })
            var user=await Users.findByPk(user_id)
            var post=await Posts.findByPk(post_id)
            let dueño=post.user_id
            if(dueño===user_id)return res.status(500).json({message:"no podes comprar tu misma publicacion C:"})
           
            if(!user&&!post)return res.status(500).json({message:"user o post invalido"})
            await newOrder.setUser(user);
            await newOrder.setPost(post);
            ordenes.push(newOrder)
        } catch (err) {
            res.status(500).json({message:"error no se pudo crear orden", error:err.message})
        };
    }
    res.send(ordenes)
}
const editOrden= async(req,res,next)=>{
    var carrito=req.body.carrito
    var ordenes=[]
    for(let i in carrito){
        let { id,status} = carrito[i];
        try {
            let orden=await Orders.findByPk(id)
            if(!orden) ordenes.push({message:"no se encontro esa orden"})
            orden.status=status
            await orden.save()
            ordenes.push(orden)
        } catch (err) {
            res.status(500).json({message:"error no se pudo editar orden", error:err.message})
        };
    }
    res.send(ordenes)
   
}
const cancelOrden= async(req,res,next)=>{
    let id=req.body.id
    try{
        var orden=await Orders.findByPk(id)
        orden.status="cancelled"
        await orden.save()
        res.json(orden)
    }catch(e){
        res.status(500).json({message:"algo salio mal",error:e.message})
    }
   
}

async function getVentas(req,res,next){
    let user=req.params.id
    var ventas=await Orders.findAll({include:[{model:Posts},{model:Users}]})
    let userVentas=ventas.filter(e=>e.userId===user)
    if(userVentas<1)return res.json({message:"el usuario seleccionado no tiene ventas"})
    res.json(userVentas)
}

module.exports={
    getOrdenbyId,
    createOrden,
    editOrden,
    cancelOrden,
    getAllOrden,
    getVentas
}