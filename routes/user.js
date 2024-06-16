const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")

userRouter.post("/login",userController.postlogin)
userRouter.post("/signup",userController.postsigup)


module.exports=userRouter   