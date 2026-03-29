import Navbar from '@/components/ui/Navbar'
import Login from '@/pages/login'
import Section from '@/pages/student/Section'
import React from 'react'
import {Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
         {/* //outlet is coz in authAPI humne as child likha hai sbko */}
    </div>
  )
}

export default Mainlayout
