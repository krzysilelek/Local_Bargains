const jwt = require('jsonwebtoken');

function createAccessToken(payload, time) {
  return jwt.sign({ payload: payload }, process.env.TOKEN_SECRET, { expiresIn: time });
}

function createRefreshToken(payload, time) {
  return jwt.sign({ payload: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: time });
}

async function verifyAccessToken(accessToken) {
  return await jwt.verify(accessToken, process.env.TOKEN_SECRET);
}

async function verifyRefreshToken(refreshToken) {
  return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken };
