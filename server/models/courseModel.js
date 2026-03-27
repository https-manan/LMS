import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["Beginner","Intermediate","Advance"]
    },
    coursePrice:{
        type:Number,
        required:true
    },
    courseThumbnail:{
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lecture'
        }
    ], //Creator of a course is one and the lectures are array coz there can be multiple lectures
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Course = mongoose.model("Course",courseSchema);