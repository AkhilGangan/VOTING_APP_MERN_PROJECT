const jwt = require("jsonwebtoken");
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
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

//We are hashing the password
userSchema.pre('save',async function (next){
    //console.log("Hii from inside");
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

// We are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
} 

const User = mongoose.model('USER',userSchema);

module.exports = User;