exports.getUserId = async (req, res) => {
  const user = req.user;
  res.send({ id: user.payload });
}
