import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const nevigate = useNavigate();
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>

        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button onClick={()=>{nevigate("course/:courseId/lecture")}} className="hover:text-blue-600"variant="link">
            Go to the lecture page
          </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;