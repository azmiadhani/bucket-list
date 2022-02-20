const { Router } = require("express");
const bucketListController = require("../../controllers/bucketlistController");

const router = Router();

router.get("/", bucketListController.get);
router.post("/", bucketListController.post);
router.put("/:id", bucketListController.put);
router.delete("/:id", bucketListController.delete);

module.exports = router;
