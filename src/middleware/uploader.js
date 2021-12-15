const multer =require("multer")

const filename =(req,file,next)=>{
    let lastindexof=file.originalname.lastIndexOf(".")
    let ext=file.originalname.substring(lastindexof)
    next(null,`img-${Date.now()}${ext}`)
}

const destination =(req,res,next)=>{
    next(null,`/app/src/uploads`)
    
}

const uploader=multer({
    storage:multer.diskStorage({destination,filename})

})

module.exports={
    uploader
} 
