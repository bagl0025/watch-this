const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Shows, WatchList } = require('../models');
const withAuth = require('../utils/auth');

// get all watchlists for dashboard
router.get('/', withAuth, (req, res) => {
  WatchList.findAll({
    where: {
      user_id: req.session.user_id,
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
      const watchlists = dbWatchListData.map((watchlist) =>
        watchlist.get({ plain: true })
      );
      res.render('dashboard', { watchlists, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  WatchList.findByPk(req.params.id, {
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
      if (dbWatchListData) {
        const watchlist = dbWatchListData.get({ plain: true });

        res.render('edit-watchlist', {
          watchlist,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
