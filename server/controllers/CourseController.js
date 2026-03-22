import { Course } from "../models/courseMode.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async(req,res)=>{
    try {
        const {courseTitle,category,coursePrice} = req.body;
        const courseThumbnail = req.file;
        if(!courseTitle||!category||!coursePrice||!courseThumbnail){
            return res.status(400).json({
                msg:"All fields are requiired."
            })
        }
        if(isNaN(coursePrice)) {
            return res.status(400).json({ msg: "Invalid price" });
        }
        if (!req.file||!req.file.path) {
            return res.status(400).json({ msg: "Thumbnail is required" });
        }
        const cloudResponse = await uploadMedia(courseThumbnail.path);
        const {secure_url:photoUrl,public_id} = cloudResponse;
        const updateData={
            courseTitle,category,coursePrice,courseThumbnail:photoUrl
        }
        const course = await Course.create({
                ...updateData,creator:req.id
        })
        return res.status(201).json({
            msg:"Course created successfully",
            course
        })
    } catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:"Internal server error in creating course"
    })
    }
}