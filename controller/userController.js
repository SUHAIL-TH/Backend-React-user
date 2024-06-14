const jwt=require("jsonwebtoken")
const userSchema =require("../model/userSchema")
const bycrpt=require("bcrypt")



const postsigup=async(req,res)=>{
  try {
    let {name,email,password,phone}=req.body
    console.log(req.body.password);
  let userExsist=await userSchema.findOne({email:email})
  if(!userExsist ){
    let passwordhased=await bycrpt.hash(req.body.password,10)
    let data={
      name:name,
      email:email,
      phone:phone,
      password:passwordhased
    }
    // let result=await userSchema.create(data)
    // console.log(result)

  }else{
    return res.status(200).send({message:"Email already used",status:false})
  }

  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthinge went wrong",status:false})
  }
}


const postlogin = async(req, res) => {
  try {
    
    console.log(req.body);
    let user=await userSchema.findOne({email:req.email})
    if(user){


      res.send({ message: "somthing added successfully" });
    }else{
      res.status(401).send({message:"User not found",status:false})
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "somthing went wrong" ,status:true});
  }
};

module.exports = {
  postlogin,
  postsigup
};
