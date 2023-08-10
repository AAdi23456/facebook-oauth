const express = require('express');
const Router = express.Router();
const User = require("../models/users")
const otp=0
Router.post("/sendotp",(req,res)=>{
    try {
        const {number}=req.body
        otp=generateOTP()
    } catch (error) {
        
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
  