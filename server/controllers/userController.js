import { User } from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        const user = await User.create({
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
        const isPassword = await bcrypt.compare(password,userExists.password);
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