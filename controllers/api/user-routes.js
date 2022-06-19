const nodemailer = require('nodemailer');
const router = require('express').Router();
const { User, WatchList, Shows } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: WatchList,
        attributes: ['id', 'title', 'created_at'],
      },
      {
        model: Shows,
        attributes: ['id', 'shows_text', 'created_at'],
        include: {
          model: WatchList,
          attributes: ['title'],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
        emailWelcome();
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
  
    console.log("Successssssssssssssssss!!!!!");

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  newmail().catch(console.error);

};

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
