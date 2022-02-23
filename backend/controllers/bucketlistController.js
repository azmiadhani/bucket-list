const asyncHandler = require('express-async-handler');
const Bucketlist = require('../models/bucketlistModel');

// @desc    Get >bucketlist
// @route   GET /api/bucketList
// @access  Private
module.exports.get = asyncHandler(async (req, res) => {
  // find all from db
  const bucketlists = await Bucketlist.find();

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
    name: req.body.name,
  });

  res.status(201).json(bucketlist);
});

// @desc    Update >bucketlist
// @route   PUT /api/bucketList/:id
// @access  Private
module.exports.put = asyncHandler(async (req, res) => {
  // check if id exist and update data in db, third argument is option to create if doesnt exist
  const updatedBucketlist = await Bucketlist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (updatedBucketlist == null) {
    res.status(404);
    throw new Error('Bucketlist not found');
  }

  res.status(200).json(updatedBucketlist);
});

// @desc    Delete >bucketlist
// @route   DELETE /api/bucketList/:id
// @access  Private
module.exports.delete = asyncHandler(async (req, res) => {
  // deleting data on db
  const deletedBucketlist = await Bucketlist.findByIdAndDelete(req.params.id);
  if (!deletedBucketlist) {
    res.status(400);
    throw new Error('Bucketlist not found');
  }

  res.status(200).json(deletedBucketlist);
});
