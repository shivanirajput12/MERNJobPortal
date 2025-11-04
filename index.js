// const express = require('express'); old way to require modules

import express from 'express'; // new way using ES6 modules
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

dotenv.config({});

const app = express();

app.get('/home', (req, res)=>{
   return res.status(200).json({message: "Welcome to Job Portal", succsess: true});
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    

const corsOptions = {
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at ${PORT}`);
})