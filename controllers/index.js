const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const maintRoutes = require('./maintRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/maint', maintRoutes);

module.exports = router;

