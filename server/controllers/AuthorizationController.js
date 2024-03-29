const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.js');

const ACCESS_TOKEN_AGE = '10m';
const REFRESH_TOKEN_AGE = '1d';

exports.login = async (req, res) => {
  const password = req.body.password;
  const user = req.user;
  if (user.active === false) return res.sendStatus(403);
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.sendStatus(401);

  const id = user.id;
  const roleId = req.user_role.role_id;
  const accessToken = createAccessToken({ id, roleId }, ACCESS_TOKEN_AGE);
  const refreshToken = createRefreshToken({ id, roleId }, REFRESH_TOKEN_AGE);

  res.cookie('accessToken', accessToken, {
    maxAge: 600000,
    httpOnly: true,
    secure: false
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3600000 * 24,
    httpOnly: true,
    secure: false
  });
  res.send({ accessToken, refreshToken });
};

exports.authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies ?? null;

  if (accessToken === null) return res.sendStatus(401);

  try {
    const { payload } = await verifyAccessToken(accessToken);
    req.user = payload;
  } catch (err) {
    return res.sendStatus(403);
  }
  next();
};

exports.decodeRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies ?? null;
  if (refreshToken === null) return res.status(401);

  try {
    const { payload } = await verifyRefreshToken(refreshToken);
    req.user = payload;
  } catch (err) {
    return res.sendStatus(403);
  }
  next();
}

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies ?? null;

  if (refreshToken === null) return res.status(401);

  try {
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = createAccessToken(user.payload, ACCESS_TOKEN_AGE);
    res.cookie('accessToken', accessToken, {
      maxAge: 600000,
      httpOnly: true,
      secure: true
    });
    res.send({ accessToken });
  } catch (err) {
    return res.sendStatus(403);
  }
};
