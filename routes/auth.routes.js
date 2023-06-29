const autController= require("../controller/auth.controller")
const {verifySignUp}=require("../middleware/verifySignup")
 

module.exports = function(app){

    app.post("/crm/api/v1/auth/signup",[verifySignUp.validateSignUpRequest], autController.signup)
   app.post("/crm/api/v1/auth/signin", autController.signin)

}