const { Router } = require('express');
const bucketListRoutes = require('./bucketListRoutes');
const authRoutes = require('./authRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/bucketlist', bucketListRoutes);

module.exports = router;
