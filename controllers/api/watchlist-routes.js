const router = require('express').Router();
const sequelize = require('../../config/connection');
const { WatchList, User, Reviews } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  WatchList.findAll({
    attributes: ['id', 'title', 'created_at'],
    include: [
      {
        model: Reviews,
        attributes: ['id', 'reviews_text', 'watchlist_id', 'user_id', 'created_at'],
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
    .then((dbWatchListData) => res.json(dbWatchListData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  WatchList.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at'],
    include: [
      {
        model: Reviews,
        attributes: ['id', 'reviews_text', 'watchlist_id', 'user_id', 'created_at'],
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
        res.status(404).json({ message: 'No WatchList found with this id' });
        return;
      }
      res.json(dbWatchListData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  WatchList.create({
    title: req.body.title,
    WatchList_url: req.body.WatchList_url,
    user_id: req.session.user_id,
  })
    .then((dbWatchListData) => res.json(dbWatchListData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO update put for movies etc...
router.put('/:id', withAuth, (req, res) => {
  WatchList.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbWatchListData) => {
      if (!dbWatchListData) {
        res.status(404).json({ message: 'No WatchList found with this id' });
        return;
      }
      res.json(dbWatchListData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  WatchList.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbWatchListData) => {
      if (!dbWatchListData) {
        res.status(404).json({ message: 'No WatchList found with this id' });
        return;
      }
      res.json(dbWatchListData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
