const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "eshoes518@gmail.com",
      pass: 'fjjsmlxgavwxvsem',
    }
  });


  module.exports={
    transporter
  }