import { Course } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category, coursePrice } = req.body;
        const courseThumbnail = req.file;
        if (!courseTitle || !category || !coursePrice || !courseThumbnail) {
            return res.status(400).json({
                msg: "All fields are requiired."
            })
        }
        if (isNaN(coursePrice)) {
            return res.status(400).json({ msg: "Invalid price" });
        }
        if (!req.file || !req.file.path) {
            return res.status(400).json({ msg: "Thumbnail is required" });
        }
        const cloudResponse = await uploadMedia(courseThumbnail.path);
        const { secure_url: photoUrl, public_id } = cloudResponse;
        const updateData = {
            courseTitle, category, coursePrice, courseThumbnail: { url: photoUrl, public_id }
        }
        const course = await Course.create({
            ...updateData, creator: req.id
        })
        return res.status(201).json({
            msg: "Course created successfully",
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error in creating course"
        })
    }
}

export const getCreatorCourse = async (req, res) => {
    try {
        const userId = req.id;
        const course = await Course.find({ creator: userId });
        if (!course) {
            return res.status(404).json({
                msg: "Course not found"
            })
        }
        return res.status(200).json({
            course
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Issue in fetching course"
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { title, subTitle, description, category, level, price } = req.body;
        const thumbnail = req.file;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        let updatedThumbnail = course.courseThumbnail;
        if (thumbnail) {
            await deleteMediaFromCloudinary(course.courseThumbnail.public_id);
            const cloudResponse = await uploadMedia(thumbnail.path);
            updatedThumbnail = {
                url: cloudResponse.secure_url,
                public_id: cloudResponse.public_id
            };
        }
        const updateData = {
            title, subTitle, description, category, level, price,
            courseThumbnail: updatedThumbnail
        };
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        return res.status(200).json({
            msg: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error in editCourse endpoint" });
    }
};

export const deleteCourse=async(req,res)=>{
    try {
        const courseId=req.params.courseId;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(200).json({
                msg:"No course found"
            })
        }
        await deleteMediaFromCloudinary(course.courseThumbnail.public_id);
        for(const lectureId of course.lectures){
            const lecture = await Lecture.findById(lectureId);
            if(lecture){
                await deleteVideoFromCloudinary(lecture.video.public_id);
                await Lecture.findByIdAndDelete(lectureId);
            }
        }
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            msg:"Course deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in del route"
        })
    }
}


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                msg: "No course found"
            })
        }
        return res.status(200).json({ course });
    } catch (error) {
        console.log(error);
    }
}


export const getLectures = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({
                msg: "course not found"
            })
        }
        return res.json({
            lecture: course.lectures
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong in getLec endpoint"
        });
    }
}

export const createLecture = async (req, res) => {
    try {
        const { title } = req.body;
        const courseId = req.params.courseId;
        const video = req.file;
        if (!title || !courseId || !video) {
            return res.status(400).json({
                msg: "All fields are required."
            })
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                msg: "No course found"
            })
        }
        const cloudRes = await uploadMedia(video.path);
        const { secure_url, public_id } = cloudRes;
        const lec = await Lecture.create({
            lectureTitle: title,
            video: { url: secure_url, public_id }
        })
        course.lectures.push(lec._id);
        await course.save();
        return res.status(201).json({
            msg: "Lecture created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong in createLec endpoint"
        });
    }
}

export const editLecture = async (req, res) => {
    try {
        const { title, isPreviewFree } = req.body;
        const { lectureId } = req.params; 
        const video = req.file;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ msg: "Lecture not found" });
        }
        let updatedVideo = lecture.video;
        if (video) {
            await deleteVideoFromCloudinary(lecture.video.public_id); 
            const cloudResponse = await uploadMedia(video.path);
            updatedVideo = {
                url: cloudResponse.secure_url,
                public_id: cloudResponse.public_id
            };
        }
        const updatedLecture = await Lecture.findByIdAndUpdate(
            lectureId,
            { lectureTitle: title, isPreview: isPreviewFree, video: updatedVideo },
            { new: true }
        );
        return res.status(200).json({
            msg: "Lecture updated successfully",
            lecture: updatedLecture
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong in editLec endpoint"
        });
    }
}

export const deleteLec=async(req,res)=>{
    try {
        const {lectureId}=req.params;
        const lecture=await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                msg:"No lecture found"
            })
        }
        await deleteVideoFromCloudinary(lecture.video.public_id);
        await Course.updateOne(
             { lectures: lectureId },
             { $pull: { lectures: lectureId } }
        )
        await Lecture.findByIdAndDelete(lectureId);
        return res.status(200).json({
            msg:"Lecture deleted successfully"
        })
    } catch (error) {
       console.log(error) 
       return res.status(500).json({
        msg:"Error in deleteLec route"
       })
    }
}