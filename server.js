
// const express = require("express")
import express from "express"
import mongoose from "mongoose"
const app = express()
import {PORT} from './configs/server.config.js'
import { DB_NAME } from "./configs/db.config.js"
import { DB_URL } from "./configs/db.config.js"
import { User } from "./models/user.model.js"
import bcrypt from "bcryptjs";
import authRoutes from "./routes/auth.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/product.routes.js"

app.use(express.json())

//Connection with mongodb
// mongoose.connect(db_config)
mongoose.connect(DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log('Error while connecting to the mongoDB')
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user  = await User.findOne({userId : "admin"})

       if(user){
          console.log("Admin is already present")
          return
        }

    }catch(err){
        console.log("Error while reading the data", err)
    }
    

    try{
      User = await User.create({
        name : "Abhi",
        userId : "admin",
        email : "abhi@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)
      })
      console.log("Admin created ", User)


    }catch(err){
        console.log("Error while create admin", err)
    }
}


/**
 * Stich the route to the server
 */

// require("./routes/auth.routes")(app)
// require("./routes/category.routes")(app)

authRoutes(app);
categoryRoutes(app);
productRoutes(app)
/**
 * Start the server
 */
app.listen(PORT, ()=>{
    console.log("Server started at port num : ", PORT)
})
