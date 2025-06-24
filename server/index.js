import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


import cartRouter from './routes/cartRoute.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoute.js';
import userRouter from './routes/userRoute.js';
import restaurantRouter from './routes/restaurantRoute.js'

import adminRouter from './routes/adminRoute.js';

//app config
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());// req from frontend to backend is parsed 

app.use(cors());

const mongoURI = process.env.MONGO_URL;

const connectToDB=async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(error.message);
    }
}
connectToDB();

//api endpoints
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/restaurant',restaurantRouter);

app.get('/',(req,res)=>{
    res.send("root working");
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
