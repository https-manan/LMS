import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from './button'
import DarkMode from './DarkMode'
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const nevigate = useNavigate();
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const logoutHandler = async () => {
    await logoutUser();
    nevigate('/login')
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout successfully")
    }
  }, [isSuccess])
  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-700 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-4'>
          <School size={30} />
          <Link to='/'>
          <h1 className='hidden md:block font-extrabold text-2xl cursor-pointer'>E-learning</h1>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800 cursor-pointer" />
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer"><Link to="my-courses">My Courses</Link></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer"><Link to="profile">My Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                {
                  user.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </>
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button onClick={() => { nevigate('/login') }} className="cursor-pointer" variant='outline'>Login</Button>
              <Button className="cursor-pointer">SignUp</Button>
            </>
          )}
          <DarkMode />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-16">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar




const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-400" variant="outline"><Menu /></Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className='flex flex-col space-y-4'>
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log Out</span>
        </nav>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
