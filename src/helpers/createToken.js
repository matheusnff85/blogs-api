require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (userEmail) => {
  const token = jwt.sign({ userEmail }, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

module.exports = { generateToken };