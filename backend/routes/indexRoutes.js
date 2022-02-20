const { Router } = require("express");
const apiRoutes = require("./api/indexApi");

const router = Router();

const api = `/${process.env.BASE_API_URL}`;

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json("No API route found"));

module.exports = router;
