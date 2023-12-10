exports.getUserInfo = async (req, res) => {
  const user = req.user;
  res.send({ id: user.id, role: req.role_name });
}
