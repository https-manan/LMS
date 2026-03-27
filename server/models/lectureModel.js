import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: true
    },
    video: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    isPreview:{
        type:Boolean
    }
})

export const Lecture = mongoose.model("Lecture",lectureSchema)