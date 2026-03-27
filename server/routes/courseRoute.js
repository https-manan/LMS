import { createCourse, createLecture, deleteLec, editCourse, editLecture, getCourseById, getCreatorCourse, getLectures } from '../controllers/courseController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';

import express from 'express';
const route = express.Router();

route.post('/create',isAuthenticated,upload.single("CourseThumbnail"),createCourse);
route.get("/getCourse",isAuthenticated,getCreatorCourse);
route.put("/editCourse/:courseId",isAuthenticated,upload.single("CourseThumbnail"),editCourse);
route.get("/getCourse/:courseId",isAuthenticated,getCourseById);
route.post("/:courseId/lecture",isAuthenticated,upload.single("video"),createLecture);
route.get("/:courseId/lecture",isAuthenticated,getLectures);
route.put("/:courseId/:lectureId/update-lecture",isAuthenticated,editLecture);
route.delete("/:lectureId",isAuthenticated,deleteLec);

export default route;
