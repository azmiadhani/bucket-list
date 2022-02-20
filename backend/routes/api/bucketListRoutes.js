const { Router } = require("express");
const bucketListController = require("../../controllers/bucketlistController");

const router = Router();

router.get("/", bucketListController.get);
router.post("/", bucketListController.post);
router.put("/:id", bucketListController.put);
router.delete("/:id", bucketListController.delete);

// can do like this too:
// router.route("/").get(bucketListController.get).post(bucketListController.post);
// router.route("/:id").put(bucketListController.put).delete(bucketListController.delete);

module.exports = router;
