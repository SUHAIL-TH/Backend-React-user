
const userSchema =require("../model/userSchema")

const bycrpt=require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer")
const transporter =require("../config/mailerConfig")


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user by providing name, email, password, and phone number. The email and phone number must be unique.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Signup completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Signup completed successfully
 *                 status:
 *                   type: boolean
 *                   example: true
 *       201:
 *         description: Phone number already existed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Phone number already existed
 *                 status:
 *                   type: boolean
 *                   example: false
 *       409:
 *         description: Email already existed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already existed
 *                 status:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Something went wrong on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 * 


 
 *                 status:
 *                   type: boolean
 *                   example: false
 */




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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user by validating the email and password, and returns a JWT token if successful.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *           minLength: 5
 *           maxLength: 50
 *           example: johndoe@example.com
 *         required: true
 *         description: The user's email address
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           example: Password123
 *           description: Password must be between 8 and 20 characters
 *         required: true
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfully
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password does not match
 *                 status:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 status:
 *                   type: boolean
 *                   example: false
 */





const postlogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userSchema.findOne({ email: email });
    
    if (user) {
      let match = await bycrpt.compare(password, user.password);
      
      if (match) {
        let secret="aishu_suhail"
        const token = jwt.sign({ userId: user._id},  'your-secret-key', {});

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

/**
 * @swagger
 * /userdetails:
 *   get:
 *     summary: Retrieve user details
 *     description: Get details of the user by their user ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetched user details
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60b8d295f13f2c001f647a11
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phone:
 *                       type: string
 *                       example: +1234567890
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */


const userDetails = async (req, res) => {
  try {
    console.log("reached her")
    console.log(req.userId);
    let userdetails = await userSchema.findById(req.userId);
    res.status(200).send({
      message: "Fetched user details",
      status: true,
      data: userdetails
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};



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

const getUserDetails=async(req,res)=>{
  try {
    let array=[10,20,50,50]

    array.forEach((a)=>{
      
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
  resetEmail,
  getUserDetails
};
