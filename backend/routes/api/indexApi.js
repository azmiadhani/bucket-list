const { Router } = require("express");
const bucketListRoutes = require("./bucketListRoutes");
const router = Router();

router.use("/bucket-list", bucketListRoutes);

module.exports = router;
