const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://akhil:akhilgangan@cluster0.rr1psgc.mongodb.net/mernstack?retryWrites=true&w=majority';

mongoose.connect(DB,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log(`connection successfully`);
}).catch((err)=>{console.log(`no connection`)});

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

app.listen(3000,()=>{
    console.log(`server is running at port no 3000`);
})