import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {  useEditLectureMutation } from '@/features/api/authApi';
import { Save, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const LectureTab = () => {
  const [title,setTitle] = useState("");
  const [isPreviewFree,setIsPreviewFree]=useState(false);
  const [video,setVideo]=useState(null);
  const [editLecture,{isSuccess,isError,isLoading}]=useEditLectureMutation()
  const params= useParams();
  const courseId = params.courseId;
  const submitLec=()=>{
    const formData = new FormData();
    formData.append("title",title);
    formData.append("isPreviewFree",isPreviewFree);
    formData.append("video",video);
    editLecture(courseId,formData);
  }
  useEffect(()=>{
    if(isSuccess){
      toast.success("Successfully edit the lecture")
    }
    if(isError){
      toast.error("Erro in updating lecture")
    }
  },[isError,isSuccess])
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

            <Button
              variant="destructive"
              size="sm"
              className="rounded-xl gap-2 text-sm font-semibold">
              <Trash2 className="h-4 w-4" />
              Remove Lecture
            </Button>
          </CardHeader>

          <Separator/>

          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                id="title"
                defaultValue="Introduction to Docker and Containerization"
                className="rounded-xl bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Video{" "}
                <span className="text-destructive ml-0.5">*</span>
              </Label>

              <label
                htmlFor="video-upload"
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer group"
              >
                <input
                  value={video}
                  onChange={(e)=>{setVideo(e.target.files[0])}}
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
                    Choose File
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    No file chosen · MP4, MOV, AVI supported
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
              <Switch value={isPreviewFree} onCheckedChange={(checked) => setIsPreviewFree(checked)} defaultChecked/>
            </div>
            <Separator />
            <div className="flex items-center justify-end gap-3 pt-1">
              <Button variant="outline" className="rounded-xl font-semibold">
                Cancel
              </Button>
              <Button  onClick={submitLec} className="rounded-xl font-semibold gap-2">
                <Save className="h-4 w-4" />
                Update Lecture
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LectureTab
