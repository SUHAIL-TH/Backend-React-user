const jwt=require("jsonwebtoken")
const userSchema =require("../model/userSchema")
const bycrpt=require("bcrypt")
const jwt = require('jsonwebtoken');



const postsigup=async(req,res)=>{
  try {
    let {name,email,password,phone}=req.body
    console.log(req.body.password);
  let userExsist=await userSchema.findOne({email:email})
  if(!userExsist ){
    let phoneExsisted=await userSchema.findOne({phone:phone})
    if(!phoneExsisted){

      let passwordhased=await bycrpt.hash(req.body.password,10)
      let data={
        name:name,
        email:email,
        phone:phone,
        password:passwordhased
      }
      let result=await userSchema.create(data)
      res.send({message:"Signup completed successfully",status:true})
    }else{
      return res.status(201).send({message:"Phone number Exsisted",status:false})
    }
  }else{
    return res.status(200).send({message:"Email already Exsisted",status:false})
  }

  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthinge went wrong",status:false})
  }
}


const postlogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userSchema.findOne({ email: email });
    
    if (user) {
      let match = await bycrpt.compare(password, user.password);
      
      if (match) {

        res.send({ message: "Login successfully", status: true });
      } else {
        res.status(401).send({ message: "Password does not match", status: false });
      }
    } else {
      res.status(401).send({ message: "User not found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong", status: false });
  }
};
module.exports = {
  postlogin,
  postsigup
};
