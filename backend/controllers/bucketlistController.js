module.exports.get = (req, res) => {
  res.status(200).json({ messaage: "GET" });
};

module.exports.post = (req, res) => {
  res.status(200).json({ messaage: "POST" });
};

module.exports.put = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ messaage: `PUT, id=${id}` });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ messaage: `DELETE, id=${id}` });
};
