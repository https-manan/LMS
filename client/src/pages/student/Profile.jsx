import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
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
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'


const Profile = () => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const { data, isLoading,refetch } = useLoadUserQuery();
    const [updateUser, { data: updateUserData, isLoading: updateLoading, isError, isSuccess }] = useUpdateUserMutation();
    
    useEffect(()=>{
        refetch();
    },[])
 
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(updateUserData?.message || "Profile Updated");
        }
        if (isError) {
            toast.error("Failed to update profile");
        }
    }, [isError, updateUserData, isSuccess]);

    if (isLoading) return <h1>Profile Loading...</h1>;

    const user = data && data.user ;

    const updateHandler = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePic);
        await updateUser(formData);
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePic(file);
    }

    return (
        <div className="max-w-4xl mx-auto my-24 px-6">
            <h1 className="font-bold text-3xl tracking-wide mb-10">PROFILE</h1>
            <div className="flex items-center gap-8">
                <div>
                    <Avatar className="w-28 h-28">
                        <AvatarImage
                            src={user.photoUrl || "https://github.com/shadcn.png"}
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
                        <DialogTrigger asChild>
                            <Button className="bg-slate-800 hover:bg-black text-white cursor-pointer">
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input
                                        id="name-1"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name="name"
                                        placeholder={user.name}
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="profile-image">Profile Image</Label>
                                    <Input
                                        id="profile-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={fileChangeHandler}
                                    />
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    disabled={updateLoading}
                                    onClick={updateHandler}
                                >
                                    {
                                        updateLoading
                                            ? <><Loader2 className='animate-spin' />Please wait</>
                                            : "Save changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg text-center'>Your courses</h1>
                <div className='grid grid-cols-3 gap-5 my-6'>
                    {
                        user.enrolledCourses.length === 0
                            ? <h1>You haven't enrolled in any course.</h1>
                            : user.enrolledCourses.map((c) => <Course course={c} key={c._id} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile