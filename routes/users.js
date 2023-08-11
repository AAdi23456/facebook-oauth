const express = require("express")
const Routers = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../models/users")
const jwt = require("jsonwebtoken")
let otp=0
Routers.post("/register", async (req, res) => {
  try {
    const { Name,Phone,Email } = req.body
    console.log(req.body);
    const isEmailexist=await UserModel.findOne({Email})
    const isphoneExist=await UserModel.findOne({Phone})
    if(isEmailexist){
      return res.status(409).json({message:"Email already registerd"})
    }
    if(isphoneExist){
        return res.status(409).json({message:"Phone already registerd"})
    }
   const RegisterUser=new UserModel({Name,Phone,Email})
    await RegisterUser.save()
    return res.status(200).json({message:"User registration completed"})
  } catch (error) {
   console.error(error);
   return res.status(500).json({message:"internal server error"})
  }
});
Routers.post("/login", async (req, res) => {
  
  try {
    const { Phone,userotp } = req.body
    if(otp!=userotp){
      return res.status(200).json({msg: "invalid otp"} )
    }
    const user = await UserModel.findOne({ Phone })
    console.log(user);
    if(!user){
      return res.status(200).json({msg: "Please regeister first"} )
    }

    if(!user.Phone||!user.Email||!user.Name){
      return res.status(400).json({msg:"please complete your regestartion process"})
    }
    return  res.status(200).json({ msg: "Login successfull!", "token": jwt.sign({ "phone": user.Phone ,"name":user.Name,"email":user.Email}, "token_key"),})
  } catch (err) {
    res.status(500).json({ "msg": err.message })
    
  }
})
Routers.post("/sendotp",(req,res)=>{
  try {
   
      const {phone}=req.body
      if(!phone){
        return res.status(400).json({msg:"please provide the phone no"})
      }
    
      otp=generateOTP()
      const check=otpservice(phone,otp)
      if(!check){
        return res.status(200).json({msg:check})
      }
      return res.status(200).json({msg:"otp sent"})
  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
})
Routers.post("/verifyotp", async (req, res) => {
  try {
    const { userotp, phone } = req.body;

    
    if (otp !== userotp) {
      return res.status(200).json({ msg: "invalid otp" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { Phone: phone },
      { isverified: true },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ msg: "otp verified" });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

Routers.get("/data",(req,res)=>{
  try {
    const {token}=req.headers
    const decoded =jwt.verify(token,"token_key")
    console.log(decoded);
    res.status(200).json({data:{phone:decoded.phone,Name:decoded.name,Email:decoded.email}})
  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
})


function generateOTP() {
  const length = 6;
  const charset = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }

  return otp;
}

function otpservice(Number, otp) {
  const client = require('twilio')(process.env.id, process.env.pass);

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+13135137497',
      to: `+91${Number}`
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error('Error sending OTP:', error));
}

module.exports =  Routers


