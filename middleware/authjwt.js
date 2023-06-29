const jwt= require("jsonwebtoken")
const config= require("../config/auth.config")
const User= require("../module/user.module")
const constant = require(".././units/constent")

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

   if(!token){
    res.status(401).send({message:"Provided token number"})
   }

jwt.verify(token,config.secretKey,(err, decoded) =>{
    if(err){
      return  res.status(403).send({message : "Invalid token provided"})
    }

  req.userId = decoded.id 
  next();
})
 
}

isAdmin = async (req, res, next) => {

    const user = await User.findOne({
        userId : req.userId
    }) 
    
    if(user && userId === constant.userType.admin){
        next();
    }else {
        res.status(400).send({message : "Only admin are allowed"})
    }
}

const authjwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}

module.exports = authjwt;