// @desc    Get >bucketlist
// @route   GET /api/bucketList
// @access  Private
module.exports.get = (req, res) => {
  res.status(200).json({ message: 'GET' });
};

// @desc    Set >bucketlist
// @route   GET /api/bucketlist
// @access  Public
module.exports.post = (req, res) => {
  res.status(200).json({ message: 'POST', body: req.body });
};

// @desc    Update >bucketlist
// @route   PUT /api/bucketList/:id
// @access  Private
module.exports.put = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: 'PUT', id, body: req.body });
};

// @desc    Delete >bucketlist
// @route   DELETE /api/bucketList/:id
// @access  Private
module.exports.delete = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `DELETE, id=${id}` });
};
