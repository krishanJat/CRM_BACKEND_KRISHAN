const mongoose=require("mongoose")
// const {Schema,model}=mongoose

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    userId:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        default:"PENDING"
    } 
    ,
     createdAt:{
        type:Date,
        immutable:true,
        default:()=>{return Date.now()}
    },
     updatedAt:{
        type:Date,
        default:()=>{return Date.now()}
    }
})

module.exports=mongoose.model("User",UserSchema )