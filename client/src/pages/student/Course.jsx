import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({course}) => {
  const courseId=course._id;
  return (
    <Link to={`/course-detail/${courseId}`}>
    <Card className="overflow-hidden cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={course.courseThumbnail?.url}  
          alt="Course"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 hover:underline">
          {course.courseTitle}
        </h3>
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-6 w-6">
              <AvatarImage src= {course.creator?.photoUrl||"https://github.com/shadcn.png"}/>
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700 truncate hover:underline">
              {course.creator?.name}
            </span>
          </div>
          <Badge className="rounded-full px-3 py-1 text-xs bg-gray-800 hover:bg-black text-amber-50">
            {course.courseLevel}
          </Badge>
        </div>
        <p className="text-lg font-bold hover:underline">₹{course.coursePrice}</p>

      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;