require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const { id } = await User.findOne({ where: { email } });
    if (!id) {
      return res
        .status(401)
        .json({ message: 'Expired or invalid token' });
    }
    req.user = { id, email };
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};