const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Phone: { type: Number},
    isverified:{type:Boolean,default:false} ,
    Email: { type: String },
    picture: { type: String },
    Oauthid: { type: String }
  

})
const UserModel = mongoose.model("signupdetails", UserSchema)
module.exports = UserModel
