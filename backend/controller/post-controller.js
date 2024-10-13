import Post from "../models/post.js"


export const createPost = async (req, res) => {
    try {

        const post = new Post(req.body);
        await post.save();

        return res.status(200).json({ msg: "post saved successfully!" })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try {
        if (category) {
            posts = await Post.find({ categories: category })
        } else {
            posts = await Post.find();
        }
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getPostDetails=async(req,res)=>{
    const {id}=req.params;
    const postDet=await Post.findById(id);
    res.status(200).json(postDet);
}

export const updatePost=async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedDet= req.body;
        await Post.findByIdAndUpdate(id,updatedDet);
        return res.status(200).json({msg: "updated the blog"})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }

}

export const deletePost=async(req,res)=>{
    try {
        const {id}=req.params;
        await Post.findByIdAndDelete(id);
        return res.status(200).json({msg: "successfully deleted!"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}