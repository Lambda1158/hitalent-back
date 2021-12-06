const {Categories}=require("../db")


async function getCategories(req, res, next){
    var post= await Categories.findAll({
        order: [['title', 'ASC']]
    })
    res.json(post)
}

async function getCategoriesById(req, res, next){
    let { id } = req.params;

    if(id){
        try {
            let gotId= await Categories.findOne({
                where: {
                    id: id
                },
                attributes: ['id']
            })
            if(gotId) res.send(gotId)
            else {
                throw new Error('No se encontro la categoria')
            }
        } catch (error) {
            next(error)
        }
    }

};


async function createCategories(req, res, next){
    let { title } = req.body;

    try {
        let newCategory= await Categories.create({title});
        res.send(newCategory);
    } catch (error) {
        next(error)
    }
};


async function updateCategories(req, res, next){
    let { id, title } = req.body;

    try {
        let update= await Categories.findByPk({
            where: {
                id: id
            }
        });
        if(title) update.title= title;
        update.save();
        res.send(update)
    } catch (error) {
        next(error)
    }
};


async function deleteCategories(req, res, next){
    let { id }= req.params;

    try {
        let existsInDb= await Categories.findByPk(id);
        if(existsInDb){
            await Categories.destroy({
                where: {
                    id: id
                }
            })
            res.send(existsInDb)
        } 
        else {
            throw new Error('No se encontro la categoria que desea eliminar')
        }
    } catch (error) {
        next(error)
    }
};



module.exports={
    getCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
}
