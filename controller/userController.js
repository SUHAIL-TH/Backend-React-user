
const userSchema =require("../model/userSchema")
const bycrpt=require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer")
const transporter =require("../config/mailerConfig")



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
        let secret="aishu_suhail"
        const token = jwt.sign({ userId: user._id},  'your-secret-key', {
        
          });

        res.send({ message: "Login successfully", status: true,token:token });
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

const userDetails=async(req,res)=>{
  try {
    
    console.log(req.userId)    
    let userdetails=await userSchema.findById(req.userId)

  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthing went wrong"})
  }
}


const resetEmail=async(req,res)=>{
  try {
    let mailOption = {
      from: "eshoes518@gmail.com",
      to: "suhailth17756@gmail.com",  
      subject: "Link for reset password",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: black; padding: 20px;">
          <p style="color: white; font-size: 16px; margin-bottom: 20px; font-weight-bold">
             Hi suhail, please click the button below to reset your password:
          </p>
          <a
            href="http://localhost:4200/resetsubmit?token="
            style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px;"
          >
            Reset Password
          </a>
        </div>
      `,
    };

      transporter.transporter.sendMail(mailOption, function (error, infor) {
        a
        if (error) {
            console.log(error);
        } else {
            console.log("mail has been send to the email");

        }
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({message:"somthing went wrong",status:false})
  }
}


module.exports = {
  postlogin,
  postsigup,
  userDetails,
  resetEmail
};
