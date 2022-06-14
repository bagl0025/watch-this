const router = require('express').Router();
const { Shows } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Shows.findAll()
    .then((dbShowData) => res.json(dbShowData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Shows.create({
    shows_text: req.body.shows_text,
    user_id: req.session.user_id,
    watchlist_id: req.body.watchlist_id,
  })
    .then((dbShowData) => res.json(dbShowData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Shows.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbShowData) => {
      if (!dbShowData) {
        res.status(404).json({ message: 'No show found with this id!' });
        return;
      }
      res.json(dbShowData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
