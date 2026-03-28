import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";

const SideBar = () => {
  return (
    <div className="flex  min-h-screen">
      <div className="hidden lg:block w-[250px] sm:w-[300px] border-r bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className="mt-18 space-y-5">  
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-700 font-medium">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="/admin/courses" className="flex items-center gap-2 text-gray-700 font-medium">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  )
}
export default SideBar