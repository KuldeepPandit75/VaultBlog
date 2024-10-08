import mongoose from "mongoose";

const articleSchema= new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Please provide a title"],
    },
    content:{
        type: String,
        required:[true,"No content Provided!"]
    },
    userId:{
        type:String,
        required:[true, "No userid provided!"],
        unique: true
    },
    imageAdd:{
        type:String,
        required:[true, "Unable to fetch any image address"],
        unique: true
    }
})

const Article=mongoose.model("Article",articleSchema);

export default Article