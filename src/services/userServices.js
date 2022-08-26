const { User } = require('../database/models');
const validations = require('../helpers/validations');
const { generateToken } = require('../helpers/createToken');

const userLogin = async (email, password) => {
  const validateResult = await validations.validateLogin(email, password);
  if (validateResult !== true) return validateResult;
  const userToken = generateToken(email);
  return userToken;
};

const createUser = async (userObj) => {
  const validateUser = await validations.validateNewUser(userObj);
  if (validateUser !== true) return validateUser;
  await User.create(userObj);
  const userToken = generateToken(userObj.email);
  return userToken;
};

module.exports = { userLogin, createUser };