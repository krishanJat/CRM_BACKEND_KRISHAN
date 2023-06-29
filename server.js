const config=require("./config/server.config.js")
const dbConfig=require("./config/db.config.js")
const User=require("./module/user.module")
const bcrypt= require("bcryptjs")

//express setting
const mongoose=require("mongoose")
const  bodyParser=require("body-parser")
const express=require("express")
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))





mongoose.connect(dbConfig.DB_URL)
const db= mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to DB")

 
})

db.once("open",()=>{
    console.log("Connected to mongo DB")

       // Create an Admin if admin user doesn't excit
  init()
    
})

async function init(){
    var user= await User.findOne({userId:"admin"});

    if(user){
        console.log("Admin user alreday present")
         return;
    }

    try{
        user=await User.create({
          name:"krishan jaat",
          userId:"admin",
          email:"krishan@gmail.com",
          userType:"ADMIN",
          userStatus:"APPROVED",
          password:bcrypt.hashSync("welcome",8)
        
        });  console.log(user)

    
    }catch(e){
        console.log("Error while creating admin user " + e);
    }
       
}

//import thr routes
require("./routes/auth.routes")(app)
require("./routes/user.route")(app)

//Listen server

app.listen(config.PORT,()=>{
    console.log("Application started port",config.PORT)
})
