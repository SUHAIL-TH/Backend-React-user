const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")

userRouter.post("/postlogin",userController.postlogin)


module.exports=userRouter   