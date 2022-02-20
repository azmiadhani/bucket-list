const { Router } = require("express");
const bucketListRoutes = require("./bucketListRoutes");
const router = Router();

router.use("/bucketlist", bucketListRoutes);

module.exports = router;
