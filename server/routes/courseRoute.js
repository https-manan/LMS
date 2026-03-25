import { createCourse, getCreatorCourse } from '../controllers/courseController';
import isAuthenticated from '../middleware/isAuthenticated';
import upload from '../utils/multer';

const express = require('express');
const route = express.Router();

route.post('/create',isAuthenticated,upload,createCourse);
route.get("/getCourse",isAuthenticated,getCreatorCourse)

export default route;
