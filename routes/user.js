const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")

userRouter.post("/postlogin",userController.postlogin)
userRouter.post("/signup",userController.postsigup)


module.exports=userRouter   