const asyncHandler = require('express-async-handler');
const Bucketlist = require('../models/bucketlistModel');
const { objectIdCheck } = require('../helpers/custommongooseHelper');
// @desc    Get >bucketlist
// @route   GET /api/bucketList
// @access  Private
module.exports.get = asyncHandler(async (req, res) => {
  // find all from db
  const bucketlists = await Bucketlist.find({ user: req.payload.aud });

  res.status(200).json(bucketlists);
});

// @desc    Set >bucketlist
// @route   GET /api/bucketlist
// @access  Public
module.exports.post = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please provide name');
  }
  // insert into db
  const bucketlist = await Bucketlist.create({
    ...req.body,
    user: req.payload.aud,
  });

  res.status(201).json(bucketlist);
});

// update & delete to do : handle if req.params.id inserted are not a valid object id (error thrown by mongoose :Cast to ObjectId failed for value \"req.params.id\" (type string) at path \"_id\" for model \"bucketlists\")

// @desc    Update >bucketlist
// @route   PUT /api/bucketList/:id
// @access  Private
module.exports.put = asyncHandler(async (req, res) => {
  if (!objectIdCheck(req.params.id)) {
    res.status(404);
    throw new Error('Id format invalid');
  }
  // check if id exist and update data in db, third argument is option to create if doesnt exist
  const updatedBucketlist = await Bucketlist.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (updatedBucketlist == null) {
    res.status(404);
    throw new Error('Bucketlist not found');
  }

  res.status(201).json(updatedBucketlist);
});

// @desc    Delete >bucketlist
// @route   DELETE /api/bucketList/:id
// @access  Private
module.exports.delete = asyncHandler(async (req, res) => {
  if (!objectIdCheck(req.params.id)) {
    res.status(404);
    throw new Error('Id format invalid');
  }
  // deleting data on db
  const deletedBucketlist = await Bucketlist.findByIdAndDelete(req.params.id);
  if (!deletedBucketlist) {
    res.status(400);
    throw new Error('Bucketlist not found');
  }

  res.status(200).json(deletedBucketlist);
});
