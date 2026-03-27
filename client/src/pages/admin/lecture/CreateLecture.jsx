import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation, useGetLectureQuery } from "@/features/api/authApi";
import { VideoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const AddLecture = () => {
  const { courseId } = useParams();
  const {data,isLoading:lectureLoading,isError:lectureError,refetch} = useGetLectureQuery(courseId);
  const [createLecture, { isLoading, isSuccess, error }]=useCreateLectureMutation();

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);

  const createLec = async () => {
    if (!title || !video) {
      toast.error("Title and video are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    try {
      await createLecture({formData, courseId});
    } catch (err) {
        console.log(error)
    }
  };

  useEffect(() => {
    if (isSuccess) {
        refetch();
      toast.success("Lecture created successfully");
      setTitle("");
      setVideo(null);
    }

    if (error) {
      toast.error("Failed to create lecture");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm text-gray-500">
          Add a title and upload your lecture video.
        </p>
      </div>

      <div className="mb-6">
        <Label
          htmlFor="lecture-title"
          className="text-sm font-medium text-gray-700 mb-1.5 block"
        >
          Title
        </Label>
        <Input
          id="lecture-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your Title Name"
          className="w-full"
        />
      </div>

      <div className="mb-8">
        <Label
          htmlFor="lecture-video"
          className="text-sm font-medium text-gray-700 mb-1.5 block">
          Lecture Video
        </Label>
        <div className="flex items-center gap-3 border border-dashed border-gray-300 rounded-lg px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
          <VideoIcon className="w-5 h-5 text-gray-400 shrink-0" />

          <Input
            id="lecture-video"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            className="border-0 bg-transparent shadow-none p-0 text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-xs file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          MP4, MOV, AVI up to 2GB
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">Back to course</Button>

        <Button
          className="bg-gray-900 hover:bg-gray-700 text-white"
          onClick={createLec}
          disabled={isLoading}>
          {isLoading ? "Creating..." : "Create lecture"}
        </Button>
        <div>
            {
                lectureLoading?(
                    <p>Loading...</p>
                ):(
                    lectureError?<p>Failed to get lectures</p>:(data.lectures.map((lecture,index)=>{
                        return <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
                    }))
                )
            }
        </div>
      </div>
    </div>
  );
};

export default AddLecture;