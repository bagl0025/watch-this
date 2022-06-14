const router = require('express').Router();
const { Reviews } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Reviews.findAll()
    .then((dbReviewData) => res.json(dbReviewData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Reviews.create({
    reviews_text: req.body.reviews_text,
    user_id: req.session.user_id,
    watchlist_id: req.body.watchlist_id,
  })
    .then((dbReviewData) => res.json(dbReviewData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Reviews.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbReviewData) => {
      if (!dbReviewData) {
        res.status(404).json({ message: 'No review found with this id!' });
        return;
      }
      res.json(dbReviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
