import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const CourseTab = () => {
  const isPublished = false;

  const [input, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
  })
  const [file, setFile] = useState(null);

  const onSubmit=()=>{
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    formData.append("thumbnail", file);
    //Submit that data to BE point 
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Basic Information
              </CardTitle>
              <CardDescription>
                Make changes to your courses here. Click save when you're done.
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="cursor-pointer">
                {isPublished ? "Unpublish" : "Publish"}
              </Button>
              <Button variant="destructive" className="cursor-pointer">
                Remove Course
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={input.title}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Mastering Docker: From Beginner to Pro"
            />
          </div>
          <div className="space-y-2">
            <Label>Sub Title</Label>
            <Input
              value={input.subTitle}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, subTitle: e.target.value }))
              }
              placeholder="Learn how to build, deploy..."
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              value={input.description}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full min-h-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write your course description here..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={input.category}
                onChange={(e) => setInput((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm cursor-pointer">
                <option value="">Select a category</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Course Level</Label>
              <select
                value={input.level}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, level: e.target.value }))
                }
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm cursor-pointer"
              >
                <option value="">Select a course level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Price (INR)</Label>
              <Input
                value={input.price}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, price: e.target.value }))
                }
                type="number"
                placeholder="499"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label>Course Thumbnail</Label>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm text-muted-foreground cursor-pointer hover:bg-muted transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {file ? file.name : "Upload Thumbnail"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="w-48 h-28 rounded-md border border-dashed flex items-center justify-center text-xs text-muted-foreground overflow-hidden bg-muted/30">
              {file?(
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span>Thumbnail Preview</span>
              )}
            </div>
          </div>
           <div className="flex justify-end">
            <Button onClick={onSubmit} className="cursor-pointer w-35 h-9">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseTab