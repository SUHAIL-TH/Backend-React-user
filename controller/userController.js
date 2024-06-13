const jwt=require("jsonwebtoken")
const userSchema =require("../model/userSchema")
const bycrpt=require("bcrypt")

const postlogin = async(req, res) => {
  try {
    
    console.log(req.body);
    let user=await userSchema.findOne({email:req.email})
    if(user){


      res.send({ message: "somthing added successfully" });
    }else{
      res.status(401).send({message:"User not exsisted",status:false})
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "somthing went wrong" ,status:true});
  }
};

module.exports = {
  postlogin,
};
