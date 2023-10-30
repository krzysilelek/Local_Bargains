const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.js');

exports.login = async (req, res) => {
  const password = req.body.password;
  const user = req.user;
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Authetication failed!");
  }

  const accessToken = createAccessToken(user.id, '10m');
  const refreshToken = createRefreshToken(user.id, '1d');

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3600000 * 24 * 30,
    httpOnly: true,
    secure: true
  });

  res.send({ accessToken, refreshToken });
};

exports.authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies ?? null;

  if (accessToken === null) return res.sendStatus(401);

  verifyAccessToken(accessToken)
    .then(user => {
      req.user = user;
    }).catch(() => {
      return res.sendStatus(403);
    });

  next();
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies ?? null;

  if (refreshToken === null) return res.status(401);

  verifyRefreshToken(refreshToken)
    .then(user => {
      const accessToken = createAccessToken(user.payload, '5s');
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true
      });
      res.send({ accessToken, refreshToken });
    })
    .catch(() => {
      return res.sendStatus(403);
    });
};
