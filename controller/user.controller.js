const User = require("../module/user.module")
const convertUserObject = require("../units/convertUserObj")


exports.findAll = async (req,res) => {
 
    try{
        let users= await User.find({
            if(users){
               return res.status(200).send(convertUserObject.convertUserObject(users))
            }
        })

   
    }catch(e){
      
        res.status(500).send({message : "Some internal error oucred"})
    }

} 

exports.findById = (req,res) => {
    
} 

exports.update = (req,res) => {
    
} 

exports.delete = (req,res) => {
    
} 