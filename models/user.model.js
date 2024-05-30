// const mongoose = require("mongoose")
import mongoose from "mongoose"


/**
 * name
 * userId
 * password
 * email
 * userType
 */
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true 
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }

},{timestamps : true,versionKey:false})

export default mongoose.model("User",userSchema)