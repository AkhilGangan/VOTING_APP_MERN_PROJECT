const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

const PORT = process.env.PORT;


//MiddleWare
const middleware = (req,res,next)=>{
    console.log(`Hello My Middleware`);
    next();
}

app.get('/',(req,res)=>{
    res.send('Hello World from Akhil');
});

app.get('/about',middleware,(req,res)=>{
    console.log(`Hello My About`);
    res.send('Hello About World from Akhil');
});

app.get('/contact',(req,res)=>{
    res.send('Hello Contact World from Akhil');
});

app.get('/signin',(req,res)=>{
    res.send('Hello Log in World from Akhil');
});

app.get('/signup',(req,res)=>{
    res.send('Hello Register World from Akhil');
});

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})