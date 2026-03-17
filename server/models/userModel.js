import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["student","instructor"],
        default:"student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
})

export const User = mongoose.model("User",userSchema)