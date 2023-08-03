const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs  = require("fs");

dotenv.config({path:'./config.env'});

require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

// We link router file to make our route
app.use(require('./router/auth'));

const PORT = process.env.PORT;


//MiddleWare
const middleware = (req,res,next)=>{
    console.log(`Hello My Middleware`);
    next();
}

// app.get('/',(req,res)=>{
//     res.send('Hello World from Akhil from app.js');
// });

app.get('/about',middleware,(req,res)=>{
    console.log(`Hello My About`);
    res.send('Hello About World from Akhil');
});

app.get('/contact',(req,res)=>{
    // res.cookie("test",'akhil')
    res.send('Hello Contact World from Akhil');
});

app.get('/signin',(req,res)=>{
    res.send('Hello Log in World from Akhil');
});

app.get('/signup',(req,res)=>{
    res.send('Hello Register World from Akhil');

});
app.get('/userapi',(req,res)=>{
    fs.readFile(`${__dirname}/userApi/userapi.json`,"utf-8",(err,data)=>{
        console.log(data);
        const objData = JSON.parse(data);
        res.send(objData[0].name);
    })
   
});

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})