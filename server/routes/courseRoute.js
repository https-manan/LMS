import { createCourse } from '../controllers/CourseController';
import isAuthenticated from '../middleware/isAuthenticated';
import upload from '../utils/multer';

const express = require('express');
const route = express.Router();

route.post('/create',isAuthenticated,upload,createCourse);

export default route;
