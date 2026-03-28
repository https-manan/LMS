import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Section from './pages/student/Section'
import Mainlayout from './layout/Mainlayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyCourses from './pages/student/MyCourses'
import Profile from './pages/student/Profile'
import SideBar from './pages/admin/SideBar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Section />
            <Courses />
          </>)
      },
      {
        path: "login",
        element: <>
          <Login />
        </>
      },
      {
        path: 'my-courses',
        element: <MyCourses/>
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: 'admin',
        element: <SideBar />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'courses',
            element: <CourseTable />,
          },
          {
            path: 'courses/create', 
            element: <AddCourse />
          },
          {
            path:'courses/:courseId',
            element:<EditCourse/>
          },
          {
            path:'courses/:courseId/lecture',
            element:<CreateLecture/>
          },{
            
            path: 'courses/:courseId/lecture/:lectureId',
            element: <EditLecture/>
          }
        ]
      }
    ]
  }
])



function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
