import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/authApi";
import { useEffect,useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
        const [createCourse,{isSuccess,error,isLoading,data}] = useCreateCourseMutation();
        const [form,setForm]=useState({
            courseTitle: "",
            category: "",
            coursePrice: "",
            courseDescription:""
        })
        const [file,setFile] = useState(null);
        const nevigate = useNavigate();
        useEffect(()=>{
            if(isSuccess){
                toast.success("Course Created successfully");
                nevigate('/admin/course')
            }
            if(error){
                toast.error("Failed to create course")
            }
        },[isSuccess,error,isLoading,data])
        const courseHandler = ()=>{
            const formData = new FormData();
            formData.append("courseTitle", form.courseTitle);
            formData.append("category", form.category);
            formData.append("coursePrice", form.coursePrice);
            formData.append("courseDescription", form.courseDescription);
            formData.append("courseThumbnail", file);

            createCourse(formData);
        }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl rounded-2xl shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Create New Course</h1>
            <p className="text-sm text-gray-500">
              Add basic details for your new course
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Course Title</label>
            <Input
              name="courseTitle"
              value={form.courseTitle}
              placeholder="Your Course Name"
              onChange={(e)=>{setForm({...form,courseTitle:e.target.value})}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={form.category} onValueChange={(e) =>setForm({ ...form, category: e })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nextjs">NextJs</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
                <SelectItem value="Dockers">Dockers</SelectItem>
                <SelectItem value="MERN">MERN</SelectItem>
                <SelectItem value="Devops">Devops</SelectItem>
                <SelectItem value="AWS">AWS</SelectItem>
                <SelectItem value="Kubernities">Kubernities</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Node">Node</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Price (₹)</label>
            <Input
              type="number"
              name="coursePrice"
              placeholder="Enter price"
              value={form.coursePrice}
              onChange={(e)=>{setForm({...form,coursePrice:e.target.value})}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Thumbnail</label>
            <Input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Write a short course description..."
              className="w-full border rounded-lg p-2 text-sm"
              rows={4}
              value={form.courseDescription}
              onChange={(e)=>{setForm({...form,courseDescription:e.target.value})}}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button onClick={courseHandler} disabled={isLoading}>
               {
                isLoading?<span className="flex items-center gap-2"><Loader2 className="animate-spin" />Please Wait</span>: "Create Course" 
               }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
