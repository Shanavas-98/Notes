const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URI)
    .then((data)=>{
        console.log(`mongodb connected:${data.connection.host}`);
    })
    .catch((error)=>{
        console.log('Database Error:',error.message);
        process.exit();
    })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', userRouter);

//server
app.listen(process.env.PORT, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    }
})