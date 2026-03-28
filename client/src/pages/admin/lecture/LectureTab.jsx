import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useEditLectureMutation, useDeleteLectureMutation } from '@/features/api/authApi'; // ✅ imported useDeleteLectureMutation
import { Save, Trash2, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ added useNavigate for redirect after delete
import { toast } from 'sonner';

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [video, setVideo] = useState(null);

  const [editLecture, { isSuccess, isError, isLoading }] = useEditLectureMutation();
  const [deleteLecture, { isSuccess: delSuccess, isError: delError, isLoading: delLoading }] = useDeleteLectureMutation(); // ✅ added delete mutation

  const params = useParams();
  const courseId = params.courseId;
  const lectureId = params.lectureId;
  const navigate = useNavigate(); // ✅ for redirecting after delete

  const submitLec = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("isPreviewFree", isPreviewFree);
    if (video) formData.append("video", video);
    editLecture({ courseId, lectureId, formData });
  }

  // ✅ delete lecture handler
  const deleteLec = async () => {
    await deleteLecture(lectureId);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lecture updated successfully");
    }
    if (isError) {
      toast.error("Error in updating lecture");
    }
  }, [isError, isSuccess])

  // ✅ redirect back to lecture list after successful delete
  useEffect(() => {
    if (delSuccess) {
      toast.success("Lecture deleted successfully");
      navigate(`/admin/courses/${courseId}/lecture`);
    }
    if (delError) {
      toast.error("Error in deleting lecture");
    }
  }, [delSuccess, delError])

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Card className="shadow-sm border rounded-2xl">
          <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">
                Edit Lecture
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Make changes and click save when done.
              </CardDescription>
            </div>
            {/* ✅ delete button with loading state */}
            <Button
              onClick={deleteLec}
              disabled={delLoading}
              variant="destructive"
              size="sm"
              className="rounded-xl gap-2 text-sm font-semibold">
              <Trash2 className="h-4 w-4" />
              {delLoading ? "Deleting..." : "Delete Lecture"}
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                placeholder="Enter lecture title"
                className="rounded-xl bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Video <span className="text-destructive ml-0.5">*</span>
              </Label>
              <label
                htmlFor="video-upload"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer group"
              >
                <input
                  onChange={(e) => setVideo(e.target.files[0])}
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="sr-only"
                />
                <div className="bg-primary/10 rounded-lg p-2.5 group-hover:bg-primary/15 transition-colors">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {video ? video.name : "Choose File"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    MP4, MOV, AVI supported
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Is this video FREE?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Free lectures are visible to non-enrolled users
                </p>
              </div>
              <Switch
                checked={isPreviewFree}
                onCheckedChange={(checked) => setIsPreviewFree(checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-end gap-3 pt-1">
              <Button variant="outline" className="rounded-xl font-semibold">
                Cancel
              </Button>
              {/* ✅ update button with loading state */}
              <Button
                onClick={submitLec}
                disabled={isLoading}
                className="rounded-xl font-semibold gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Updating..." : "Update Lecture"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LectureTab;