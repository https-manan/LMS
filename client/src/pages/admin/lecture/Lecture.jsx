import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate();

    const goToUpdateLecture = () => {
        navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
    }; 
    return (
        <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-gray-800 p-3 rounded-md mb-2">
            <h1 className="font-bold text-gray-800 dark:text-gray-100">
                Lecture - {index + 1}: {lecture.lectureTitle}
            </h1>
            <Edit
                onClick={goToUpdateLecture}
                size={20}
                className="cursor-pointer text-gray-600 dark:text-gray-300"
            />
        </div>
    );
};
export default Lecture;