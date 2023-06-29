const {authjwt,verifySignup} = require("../middleware")
const userController =require("../controller/user.controller")
 

module.exports = function(app){

   app.get("crm/api/v1/users",[authjwt.verifyToken,authjwt.isAdmin],userController.findAll)
   app.get("crm/api/v1/users/:userId",[authjwt.verifyToken,authjwt.isAdmin],userController.findById)
   app.put("crm/api/v1/users/:userId",[authjwt.verifyToken,authjwt.isAdmin],userController.update)
   app.delete("crm/api/v1/users/:userId" ,userController.delete)
}

