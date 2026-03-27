import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link, useNavigate} from 'react-router-dom'
import { useGetCourseQuery } from '@/features/api/authApi'


const CourseTable = () => {
  const nevigate = useNavigate();
    const {data,isLoading} = useGetCourseQuery();
    if(isLoading){
        return <h1>Loading....</h1>
    }
  return (
    <div className="p-6 mt-9 bg-gray-50 min-h-screen">
      <Link to='/admin/course/create'>
        <Button  className="mb-6 bg-black text-white hover:bg-black/90 rounded-lg px-5 py-2">
            Create new course
        </Button>
      </Link>
      <div flex>
              <div className="bg-white rounded-xl shadow-sm border">
        <Table>

          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[400px] text-gray-500 font-medium">
                Title
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-right">
                Price
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data?.course||[]).map((course) => (
              <TableRow
                key={course._id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <TableCell className="font-medium py-4">
                  {course.courseTitle}
                </TableCell>
                <TableCell className="text-right py-4">
                  {course.coursePrice}
                </TableCell>
                <TableCell className="py-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    {course.isPublished?"Published":"Not Published"}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <Button 
                  onClick ={()=>{nevigate(course._id)}}
                  className="bg-gray-100 text-black hover:bg-gray-200 rounded-md px-4 py-1.5">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter />
        </Table>
      </div>
      </div>
    </div>
  )
}

export default CourseTable
