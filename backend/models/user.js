import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profile:{
        type:String,
        required: true,
    }
})

const User= mongoose.model("User",UserSchema);

export default User;