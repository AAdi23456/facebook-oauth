const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Phone: { type: Number },
    Email: { type: String, required: true },
    picture: { type: String }

})
const UserModel = mongoose.model("signupdetails", UserSchema)
module.exports = UserModel
