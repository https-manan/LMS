import { makePayment, verifyPayment } from '../controllers/purchaseController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import express from 'express';
const route = express.Router();


route.post('/verify',isAuthenticated,verifyPayment)
route.post('/:courseId',isAuthenticated,makePayment);


export default route;