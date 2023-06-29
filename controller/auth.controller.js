const constants=require("../units/constent")
const User= require("../module/user.module")
const bcrypt= require("bcryptjs")
const jwt=require("jsonwebtoken")
const authConfig = require("../config/auth.config")


exports.signup = async(req,res) => {
  
var userStatus = req.body.userStatus
var userType = req.body.userType
if(userType == constants.userType.customer || userType == constants.userType.admin || userType == constants.userType.engineer){
    userStatus = constants.userStatus.approved;
}else{
    userStatus = constants.userStatus.pending;
}

try{
const createUser = await User.create({
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
       password: bcrypt.hashSync(req.body.password,8),
       userType: req.body.userType,
       userStatus: userStatus
})
const postResponce = {
    name:createUser.name,
    userId:createUser.userId,
    email:createUser.email,
    userType:createUser.userType,
    userStatus:createUser.userStatus,
    createdAt:createUser.createdAt,
    updatedAt:createUser.updatedAt 


}
res.status(200).send(postResponce)
}catch(e){
    console.log("Erroe some Oucred created by user" , e)
    res.status(400).send({message:"Some interal error while created"})
}
}


exports.signin = async(req,res) => {
 
const user = await User.findOne({userId:req.body.userId})
if(!user){
    res.status(400).send({message:"userId does't exist "})
         return;
}

if(user.userStatus != constants.userStatus.approved){
    res.status(403).send({message:"Userstatus is not approved"})
    return;
} 

//password is not matching

var isPassword= bcrypt.compareSync(req.body.password, user.password)

if(!isPassword){
    res.status(403).send({message:"Password is not matching"})
    return;
}

 var token = jwt.sign({id:user.userId}, authConfig.secretKey, {
     expiresIn:86400
 })

 res.status(200).send({
    name:user.name,
    userId:user.userId,
    email:user.email,
    userTYpe:user.userType,
    userStatus : user.userStatus,
    accessToken : token


 })


}