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
    </div>
  )
}

export default Mainlayout
