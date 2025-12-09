import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function databseConnection (){
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connection successfully done');
    }
    catch(e){
        console.log("The database connection failed",e);
    }
}