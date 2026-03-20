import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { useLoadUserQuery } from '@/features/api/authApi'


const Profile = () => {
    const {data,isLoading} = useLoadUserQuery();
    if(isLoading){
        return <h1>Profile Loading...</h1>
    }
    const {user} = data;
    return (
        <div className="max-w-4xl mx-auto my-24 px-6">
            <h1 className="font-bold text-3xl tracking-wide mb-10">PROFILE</h1>
            <div className="flex items-center gap-8">
                <div>
                    <Avatar className="w-28 h-28">
                        <AvatarImage
                            src={user.photoUrl||"https://github.com/shadcn.png"}
                            alt="profile"
                        />
                        <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-3">
                    <p className="text-lg">
                        <span className="font-semibold">Name:</span>{" "}
                        <span className="text-gray-600">{user.name}</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Email:</span>{" "}
                        <span className="text-gray-600">{user.email}</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Role:</span>{" "}
                        <span className="text-gray-600">{user.role.toUpperCase()}</span>
                    </p>
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className="bg-slate-800 hover:bg-black text-white cursor-pointer">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you'r done.
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input id="name-1" name="name" defaultValue="Manan bhardwaj" />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="username-1">Profile Image</Label>
                                        <Input type="file" accept="image/*" />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button disabled={isLoading} type="submit">
                                        {
                                            isLoading?<><Loader2 className='animate-spin'/>Please wait</>:"Save changes"
                                        }
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog> 
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg text-center'>Your courses</h1>
                <div className='grid grid-cols-3 gap-5 my-6'>
                    {
                        user.enrolledCourses.length===0?<h1>You haven't enrolled in any course.</h1>:
                        user.enrolledCourses.map((c)=>{return <Course course={c} key={c._id}/>})
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile
