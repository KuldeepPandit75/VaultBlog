
const url="http://localhost:8000"

export const uploadBlogImage= (req,res)=>{
    if(!req.file){
        return res.status(404).json({msg:"file not found"});
    }

    console.log(req.file)

    const imageUrl=`${url}/file/${req.file.filename}`

    return res.status(200).json(imageUrl);
}