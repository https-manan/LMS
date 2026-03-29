import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';


const c =[1,2,3,4,5,6,7,8,9];

const MyCourses = () => {
  const isLoading = false;
  const myCourses =[1,2,3]
  return (
    <div className='max-w-4xl mx-auto my-25 px-4 md:px-0'>
        <h1 className='font-bold text-2xl text-center pb-7'>MY COURSES</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
          isLoading?
          c.map((x,index)=>{
            return <CourseSkeleton key={index}/>
          })
          :myCourses.length===0?(<p>You are not enrolled in any courses</p>):myCourses.map((c,index)=>{return <Course key={index} course={c}/>})
          }
        </div>
    </div>
  )
}

export default MyCourses



const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};