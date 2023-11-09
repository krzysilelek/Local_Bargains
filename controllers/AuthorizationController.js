const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.js');

const ACCESS_TOKEN_AGE = '10m';
const REFRESH_TOKEN_AGE = '1d';

exports.login = async (req, res) => {
  const password = req.body.password;
  const user = req.user;
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.sendStatus(402);

  const accessToken = createAccessToken(user.id, ACCESS_TOKEN_AGE);
  const refreshToken = createRefreshToken(user.id, REFRESH_TOKEN_AGE);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3600000 * 24,
    httpOnly: true,
    secure: true
  });

  res.send({ accessToken, refreshToken });
};

exports.authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies ?? null;

  if (accessToken === null) return res.sendStatus(401);

  try {
    const user = await verifyAccessToken(accessToken);
    req.user = user;
  } catch (err) {
    return res.sendStatus(403);
  }
  next();
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies ?? null;

  if (refreshToken === null) return res.status(401);

  try {
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = createAccessToken(user.payload, ACCESS_TOKEN_AGE);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true
    });
    res.send({ accessToken });
  } catch (err) {
    return res.sendStatus(403);
  }
};
