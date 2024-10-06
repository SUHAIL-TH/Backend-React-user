const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")
const verify=require("../middleware/authMiddleware")

userRouter.post("/login",userController.postlogin)
userRouter.post("/signup",userController.postsigup)

userRouter.get("/userdetails",verify,userController.userDetails)
userRouter.post("/resetemail",userController.resetEmail)
userRouter.post("/singupcontroller",userController.getUserDetails)
userRouter.post("/singupcontroller",userController.getUserDetails)
userRouter.post("/singupcontroller",userController.getUserDetails)

module.exports=userRouter   