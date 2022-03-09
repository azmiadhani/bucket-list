const { Router } = require('express');
const bucketListRoutes = require('./bucketListRoutes');
const authRoutes = require('./authRoutes');

const router = Router();

router.use('/bucketlist', bucketListRoutes);
router.use('/auth', authRoutes);

module.exports = router;
