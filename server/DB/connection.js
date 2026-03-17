import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = process.env.DB_URL;

async function connect(){    
    await mongoose.connect(url);
    console.log('DB connected successfully')
}

export default connect;