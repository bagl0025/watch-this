// "use strict";
const nodemailer = require('nodemailer');

console.log("===========================Was that a click I heard?===========================")

const emailWelcome = function() {
  console.log("===========================Yeah, I heard it too.===========================")

  // async..await is not allowed in global scope, must use a wrapper
  async function newmail() {
    console.log("===========================As did I!===========================")

  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.MAIL_USERNAME,
  //     pass: process.env.MAIL_PASSWORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
  //   }
  // });

  // let mailOptions = {
  //   from: "markofprogress@gmail.com",
  //   to: "markofprogress@gmail.com",
  //   subject: 'Nodemailer Project',
  //   text: 'Hi from your nodemailer project'
  // };

  // transporter.sendMail(mailOptions, function(err, data) {
  //   if (err) {
  //     console.log("Error " + err);
  //     console.log("Data " + data);
  //   } else {
  //     console.log("Email sent successfully");
  //   }
  // });

  // ===========gmail test above/ ethereal test below=========================
  
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

emailWelcome();

// document.querySelector('#new-user-submit').addEventListener('click', emailWelcome);

