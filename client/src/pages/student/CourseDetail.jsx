import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Lock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import BuyCourse from "@/components/ui/BuyCourse"
import { useGetCourseByIdQuery } from "@/features/api/authApi"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // ✅ fetch course details
    const { data, isLoading } = useGetCourseByIdQuery(courseId);

    if (isLoading) return <h1>Loading...</h1>

    const course = data?.course;

    // ✅ check if user already purchased this course
    const purchased = user?.enrolledCourses?.some(
        id => id.toString() === courseId
    );

    return (
        <div className="min-h-screen mt-15 bg-gray-100">
            <div className="bg-zinc-800 text-white px-10 py-8">
                <h1 className="text-3xl font-bold mb-2">
                    {course?.courseTitle}
                </h1>
                <p className="text-gray-300 mb-4">
                    {course?.subTitle}
                </p>
                <p className="text-sm text-gray-400">
                    Created By <span className="underline">{course?.creator?.name}</span>
                </p>
                <div className="flex gap-6 text-sm text-gray-400 mt-2">
                    <span>Last updated {new Date(course?.updatedAt).toLocaleDateString()}</span>
                    <span>Students enrolled: {course?.enrolledStudents?.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10 py-10">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Description</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {course?.description}
                        </p>
                    </div>

                    <Card className="rounded-2xl shadow-sm">
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>{course?.lectures?.length} lectures</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {course?.lectures?.map((lecture, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                    {lecture.isPreview ? (
                                        <PlayCircle size={16} className="text-gray-500" />
                                    ) : (
                                        <Lock size={16} className="text-gray-400" />
                                    )}
                                    <span>{lecture.lectureTitle}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="rounded-2xl shadow-md">
                        <CardContent className="p-4 space-y-4">
                            {/* ✅ show course thumbnail */}
                            <div className="w-full h-48 rounded-xl overflow-hidden">
                                <img
                                    src={course?.courseThumbnail?.url}
                                    alt={course?.courseTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold">
                                    {course?.lectures?.[0]?.lectureTitle}
                                </h4>
                            </div>
                            <Separator className="my-2" />
                            <p className="text-xl font-bold">₹{course?.coursePrice}</p>
                            {/* ✅ show continue or buy based on purchase status */}
                            {purchased ? (
                                <Button
                                    onClick={() => navigate(`/course-progress/${courseId}`)}
                                    className="w-full">
                                    Continue to course
                                </Button>
                            ) : (
                                <BuyCourse />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail