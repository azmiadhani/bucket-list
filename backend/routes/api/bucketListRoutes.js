const { Router } = require('express');
const bucketListController = require('../../controllers/bucketlistController');
const { verifyAccessToken } = require('../../helpers/jwtHelper');

const router = Router();

router.get('/', verifyAccessToken, bucketListController.get);
router.post('/', verifyAccessToken, bucketListController.post);
router.put('/:id', verifyAccessToken, bucketListController.put);
router.delete('/:id', verifyAccessToken, bucketListController.delete);

// can do like this too:
// router.route("/").get(bucketListController.get).post(bucketListController.post);
// router.route("/:id").put(bucketListController.put).delete(bucketListController.delete);

module.exports = router;
