import { User } from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/Cloudinary.js";

export const register=async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                msg:"All fields require",
            })
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                msg:"User already exists with this email",
            })
        }
        const hashedPass = await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password:hashedPass
        });
        res.status(201).json({
            msg:"user created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in register"
        })
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({
                msg:"All fields require",
            })
        }
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(400).json({
                msg:"Incorrect email or password",
            })
        }
        const isPassword = bcrypt.compare(password,userExists.password);
        if(!isPassword){
            return res.status(400).json({
                msg:"Incorrect password"
            })
        }
        const token = jwt.sign({userId:userExists._id},process.env.JWT_SECRET,{ expiresIn: "1d"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        });
        return res.status(200).json({
            token,
            msg:"User logined In successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in login"
        })  
    }
}

export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token",'',{maxAge:0}).json({
            message:"Logged out successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Failed to logout'
        })
    }
}

export const getUserProfile = async(req,res)=>{
    try {
        const userId =  req.id;
        const user = await User.findById(userId).select('-password')
        if(!user)return res.status(400).json({
            message:"No user found",
        })
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message:'Failed to load user'
        })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const photo = req.file;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.photoUrl) {
            const publicId = user.photoUrl.split('/').pop().split(".")[0];
            deleteMediaFromCloudinary(publicId);
        }
        const cloudResponse = await uploadMedia(photo.path);
        const { secure_url: photoUrl } = cloudResponse;

        const updatedData = { name, photoUrl }; 

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update profile"
        });
    }
}