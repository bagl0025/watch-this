const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const watchlistRoutes = require('./watchlist-routes');
const showRoutes = require('./shows-routes');

router.use('/users', userRoutes);
router.use('/watchlists', watchlistRoutes);
router.use('/shows', showRoutes);

module.exports = router;
