const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {type: String , required : true},
    email: {type: String , required : true},
    password: {type: String , required: true},
    age: {type: Number},
    role: {
        type: String,
        enum: ["user" , "groupUser" , "admin"],
        default: "user",
    },
} , {
    versionKey : false,
    timestamps : true
});

const User = mongoose.model("user" , UserSchema);

module.exports = User;