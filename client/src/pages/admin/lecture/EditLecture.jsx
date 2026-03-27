import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; 
import { ArrowLeft} from "lucide-react";
import { useParams } from "react-router-dom";
import LectureTab from "../course/LectureTab";

export default function EditLecture() {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">
            Update Your Lecture
          </h1>
        </div>
      </div>
      <LectureTab/>
    </div>
  );
}