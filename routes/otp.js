const express = require('express');
const Router = express.Router();
const User = require("../models/users")
let otp = 0
Router.post("/sendotpoauth", (req, res) => {
  try {
    const { phone } = req.body
    otp = generateOTP()
console.log(otp);
    otpservice(phone,otp)
    return res.status(200).json({ msg: "otp sent" })

  } catch (error) {
    return res.status(500).json({ message: "internal server error" })
  }
})
Router.post("/verifyotp",(req,res)=>{
  try {
      const {userotp,Oauthid}=req.body
      if(!Oauthid){
        return res.status(400).json({msg:"please provide the id"})
      }
      if(otp!=userotp){
        return res.status(200).json({msg: "invalid otp"} )
      }
    

      User.findOneAndUpdate({Oauthid:Oauthid},{isverified:true})
      return res.status(200).json({msg:"otp verifyed"})
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
  const client = require('twilio')("ACf733b968d6d907644087d00b3a6f57a5", "66beb6cada7bc2bb23edc80f22a41c0c");

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+13135137497',
      to: `+91${Number}`
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error('Error sending OTP:', error));
}

  module.exports=Router  