// const { User } = require('../database/models');
const validations = require('../helpers/validations');
const { generateToken } = require('../helpers/createToken');

const userLogin = async (email, password) => {
  const validateResult = await validations.validateLogin(email, password);
  if (validateResult !== true) return validateResult;
  const userToken = generateToken(email);
  return userToken;
};

module.exports = { userLogin };