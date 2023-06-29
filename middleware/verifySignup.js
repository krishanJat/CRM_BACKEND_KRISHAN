// const {verifySignUp} = require("../controller/auth.controller")
const User = require("../module/user.module")
const constant = require("../units/constent")
 
 validateSignUpRequest = async (req , res , next) => {
//Implement logic for validate the response

//1.validite the name

if(!req.body.name){
   res.status(400).send({message:"Fai;d! Nme is not provided"})
    return;
}

//2.valid the UserId
if(!req.body.userId){
   res.status(400).send({message:"Faild! userId is not provided"})
    return;
}
//3.valid the password
if(!req.body.password){
   res.status(400).send({message:"Faild! password is not provided"})
   return;
}

//4.valid email
const email = await User.findOne({email:req.body.email})
if(email!=null){
   res.status(400).send({message:"Faild! email is not provided"})
  return;
}
 
//5.validate If user already excite
const user = await User.findOne({userId:req.body.userId});
if(user!=null){
   res.status(400).send({message:"User Alredy excit"})
   return
}

 //6.validate the userType

const userType =req.body.userType;
const ValiduserTypes=[constant.userType.customer,constant.userType.admin,constant.userType.engineer]

if(userType &&!ValiduserTypes.includes(userType)){
  
   res.status(400).send({message:"Faild! user"})
 return;
}


 next()
 }




 

 const verifySignUp= {
    validateSignUpRequest:validateSignUpRequest
 }

 module.exports= {verifySignUp}