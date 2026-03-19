import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Section from './pages/student/Section'
import Mainlayout from './layout/Mainlayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyCourses from './pages/student/MyCourses'
import Profile from './pages/student/Profile'


const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        children:[
            {
            path:'/',
            element:(
            <>
            <Section/>
            <Courses/>
            </>)
            },{
                path:"/login",
                element:<>
                <Login/>
                </>
            },{
              path:'my-courses',
              element:<MyCourses/>
            },{
              path:"profile",
              element:<Profile/>
            }
        ]
    }
])


function App() {
  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
 