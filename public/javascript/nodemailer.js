"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'megane.rogahn60@ethereal.email',
        pass: '2sFMw1A1Z97z7WUTk6'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Watch This!" <welcome@watchthis.com>', // sender address
    to: "ernie@sesame.com",  // list of receivers
    cc: "yo@mama.com",
    subject: "Welcome to Watch This!", // Subject line
    text: "You've just taken the next step to attaining complete watching nirvana...so, whatcha watchin'?  Watch This!", // plain text body
    html: "<h1>You've just taken the next step to attaining complete watching nirvana...</h1><h2>So, whatcha watchin'?</h2><h1>Watch This!<h1>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
