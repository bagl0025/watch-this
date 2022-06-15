const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const watchlistRoutes = require('./watchlist-routes');
const showRoutes = require('./shows-routes');
const reviewRoutes = require('./reviews-routes');

router.use('/users', userRoutes);
router.use('/watchlists', watchlistRoutes);
router.use('/shows', showRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
