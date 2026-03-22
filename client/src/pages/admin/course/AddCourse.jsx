import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddCourse() {

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
              placeholder="Your Course Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={(val) => setForm((p) => ({ ...p, category: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Beginner</SelectItem>
                <SelectItem value="design">Intermediate</SelectItem>
                <SelectItem value="marketing">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Price (₹)</label>
            <Input
              type="number"
              name="coursePrice"
              placeholder="Enter price"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Thumbnail</label>
            <Input type="file" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Write a short course description..."
              className="w-full border rounded-lg p-2 text-sm"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button >Create Course</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
