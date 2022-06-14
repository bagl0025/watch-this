const router = require('express').Router();
const sequelize = require('../config/connection');
const { WatchList, User, Shows } = require('../models');

// get all watchlists for homepage
router.get('/', (req, res) => {
  console.log('======================');
  WatchList.findAll({
    attributes: ['id', 'title', 'created_at'],
    include: [
      {
        model: Shows,
        attributes: ['id', 'shows_text', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbWatchListData) => {
      const watchlists = dbWatchListData.map((watchlist) =>
        watchlist.get({ plain: true })
      );

      res.render('homepage', {
        watchlists,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single watchlist
router.get('/watchlists/:id', (req, res) => {
  WatchList.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at'],
    include: [
      {
        model: Shows,
        attributes: [
          'id',
          'shows_text',
          'watchlist_id',
          'user_id',
          'created_at',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbWatchListData) => {
      if (!dbWatchListData) {
        res.status(404).json({ message: 'No watchlist found with this id' });
        return;
      }

      const watchlist = dbWatchListData.get({ plain: true });

      res.render('single-watchlist', {
        watchlist,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
