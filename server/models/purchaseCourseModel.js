import mongoose from 'mongoose';

const purchaseSchema= new mongoose.Schema({
    courseId:{                                  //This is ki kisne course buy kia ha 
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Course",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,  //This is kisne buy kia ha
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
    },
    status:{
        type:String,
        enum:['pending','success','failed'],
        default:'pending'
    },
    paymentId:{
        type:String
    }
},{timestamps:true})


export const Purchase = mongoose.model("Purchase",purchaseSchema)