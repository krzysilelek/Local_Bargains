const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
  const password = req.body.password;
  const user = req.user;
  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword === false) {
    throw new Error("Authetication failed!");
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '10m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  res.cookie('JWT', accessToken, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true
  });
  res.send({ accessToken, refreshToken });
};

exports.authenticate = async (req, res, next) => {
  //const token = req.header('authorization')?.split(' ')[1];
  const token = req.cookies.JWT ?? null;

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next()
  });
};

exports.refresh = async (req, res, next) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sing({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.send(accessToken);
  })
};
