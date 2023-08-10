const express = require("express")
const Authorization = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../models/users")
const jwt = require("jsonwebtoken")

Authorization.post("/register", async (req, res) => {
  try {
    const { Name,Phone,Email } = req.body
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
Authorization.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await reg_model.findOne({ email })
    console.log(user);
    if(!user){
      return res.status(200).json({"msg": "Please regeister first"} )
    }
    
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(err);
        console.log(password);

        if (!result) {
         return res.status(400).json({ "msg": "Wrong Credentials" })
        
        }
        return  res.status(200).json({ "msg": "Login successfull!", "token": jwt.sign({ "email": user.email }, "masai"),"name":user.name})
      });
    
    
  } catch (err) {
    res.status(400).json({ "msg": err.message })
    
  }
})



module.exports =  Authorization


