import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();
import cors from 'cors'
import connect from './DB/connection.js';
import userRoute from './routes/userRoute.js';
import cookieParser from "cookie-parser";
import courseRoute from './routes/courseRoute.js'
import purchaseRoute from './routes/purchaseRoute.js';

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
const PORT = process.env.PORT
connect();

//API'S
app.use('/api/v1/users',userRoute);
app.use('/api/v1/courses',courseRoute);
app.use('/api/v1/payment',purchaseRoute);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})