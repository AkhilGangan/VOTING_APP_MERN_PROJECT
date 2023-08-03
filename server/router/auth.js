const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World from Akhil Router js");
});

//register route
router.post("/register", (req, res) => {
  console.log(req.body);
  // res.json({message:req.body});
  //res.send("My register page");
  const { username, password, email, phone } = req.body;

  if (!username || !password || !email || !phone) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      const user = new User({ username, password, email, phone });

      user.save().then(() => {
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//login route
router.post("/signin", async (req, res) => {
//   console.log(req.body);
  try {
    let token;
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).json({ error: "please add user or password" });
    }
    const userLogin = await User.findOne({ username: username });
    //  console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken",token,{
        expires: new Date(Date.now() + 25892000000),
        httpOnly:true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential pas" });
      } else {
        res.json({ message: "user sign in successful" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// User.findOne({email:email})
// .then(userExist=>{
//   if(!userExist){
//      return res.status(422).json({error:"Invalid Email or password"})
//   }

module.exports = router;
