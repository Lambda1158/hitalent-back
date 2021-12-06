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
    let { user_id, post_id, title, price,payment_id } = req.body;
	try {
		let newOrder = await Orders.create({
			title,
			price
		})
        var user=await Users.findByPk(user_id)
        var post=await Posts.findByPk(post_id)
        var payment=await Payments.findByPk(payment_id)
        if(!user&&!post&&!payment)return res.status(500).json({message:"user , post o payment invalido"})
		await newOrder.setUser(user);
		await newOrder.setPost(post);
        await newOrder.setPayment(payment)
		res.send(newOrder);
	} catch (err) {
		res.status(500).json({message:"error no se pudo crear orden", error:err.message})
	};
}
const editOrden= async(req,res,next)=>{
    let id =req.params.id
    let change=req.body
    try{
        var orden=await Orders.update(change,{where:{id}})
        res.json(orden)//devuelve 1 si funciona nose por que xD
    }catch(e){
        res.status(500).json({message:"no se pudo editar la orden",error:e.message})
    }
   
}
const cancelOrden= async(req,res,next)=>{
    let id=req.params.id
    try{
        var orden=await Orders.findByPk(id)
        await orden.destroy({where:id})
        res.json(orden)
    }catch(e){
        res.status(500).json({message:"algo salio mal",error:e.message})
    }
   
}

async function getVentas(req,res,next){
    let user=req.params.id
    var ventas=await Orders.findAll({include:[{model:Posts},{model:Users}]})
    let userVentas=ventas.filter(e=>e.post.user_id===user)
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