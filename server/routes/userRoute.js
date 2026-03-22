import express from 'express';
import { getUserProfile, login, logout, register, updateProfile } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';
const route = express.Router();

route.post('/register',register);
route.post('/login',login);
route.get('/logout',isAuthenticated,logout);
route.get('/profile',isAuthenticated,getUserProfile)
route.put('/profile/update',isAuthenticated,upload.single("profilePhoto"),updateProfile)


export default route;