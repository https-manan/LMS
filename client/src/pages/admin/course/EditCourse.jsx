import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const {courseId}=useParams();
  const nevigate = useNavigate();
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>

        <Link to={`/admin/courses/${courseId}/lecture`}>
          <Button className="hover:text-blue-600"variant="link">
            Go to the lecture page
          </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;