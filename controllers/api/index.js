const router = require('express').Router();
const userRoutes = require('./userRoutes');
const willRoutes = require('./willRoutes');


router.use('/users', userRoutes);
router.use('/wills', willRoutes);


module.exports = router;