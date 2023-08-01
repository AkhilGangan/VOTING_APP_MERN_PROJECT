const  mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

//We are hashing the password
userSchema.pre ('save',async function (next){
    //console.log("Hii from inside");
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
});

const User = mongoose.model('USER',userSchema);

module.exports = User;