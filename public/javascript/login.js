async function loginFormHandler(event) {
   event.preventDefault();

   const email = document.querySelector("#email-login").value.trim();
   const password = document.querySelector("#password-login").value.trim();

   if (email && password) {
      const response = await fetch("/api/users/login", {
         method: "post",
         body: JSON.stringify({
            email,
            password,
         }),
         headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
         document.location.replace("/dashboard/");
      } else {
         alert(response.statusText);
      }
   }
}

async function signupFormHandler(event) {
   event.preventDefault();

   const username = document.querySelector("#username-signup").value.trim();
   const email = document.querySelector("#email-signup").value.trim();
   const password = document.querySelector("#password-signup").value.trim();

   if (username && email && password) {
      const response = await fetch("/api/users", {
         method: "post",
         body: JSON.stringify({
            username,
            email,
            password,
         }),
         headers: { "Content-Type": "application/json" },
      });

    if (response.ok) {
      document.location.replace('/dashboard/');
    }
  }
}

  "use strict";
const nodemailer = require('nodemailer');

console.log("===========================Was that a click I heard?===========================")

const emailWelcome = function() {
  console.log("===========================Yeah, I heard it too.===========================")

  // async..await is not allowed in global scope, must use a wrapper
  async function newmail() {
    console.log("===========================As did I!===========================")

    let testAccount = await nodemailer.createTestAccount();

    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Watch This!" <welcome@watchthis.com>',
        to: "ernie@sesame.com, bert@sesame.com",
        cc: "yo@mama.com",
        subject: "Welcome to Watch This!",
        text: "You've just taken the next step to attaining complete watching nirvana...so, whatcha watchin'?  Watch This!", // plain text body
        html: "<h1>You've just taken the next step to attaining complete watching nirvana...</h1><h2>So, whatcha watchin'?</h2><h1>Watch This!<h1>", // html body
  
    });
  


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  newmail().catch(console.error);

};

//emailWelcome();

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.querySelector('.signup-form').addEventListener('submit', emailWelcome)
