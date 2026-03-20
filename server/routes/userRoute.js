import express from 'express';
import { getUserProfile, login, logout, register, updateProfile } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const route = express.Router();

route.post('/register',register);
route.post('/login',login);
route.get('/logout',logout);
route.get('/profile',isAuthenticated,getUserProfile)
route.patch('/update',isAuthenticated,updateProfile)


export default route;