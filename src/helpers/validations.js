const Joi = require('joi');
const { User } = require('../database/models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least 8 characters long',
    'any.required': '400|"displayName" is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '400|"email" must be a valid email',
    'any.required': '400|"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at least 6 characters long',
    'any.required': '400|"password" is required', 
  }),
  image: Joi.string().required().messages({
    'any.required': '400|"image" is required',
  }),
});

const validateLogin = async (email, password) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
  const result = await User.findOne({ where: { email } });
  if (!result) return { code: 400, message: 'Invalid fields' };
  return true; 
};

const validateNewUser = async (userObj) => {
  const validateResult = userSchema.validate(userObj);
  if ('error' in validateResult) {
    const [code, message] = validateResult.error.details[0].message.split('|');
    return { code, message };
  } 
  const { email } = userObj;
  const result = await User.findOne({ where: { email } });
  if (result) return { code: 409, message: 'User already registered' };
  return true;
};

module.exports = { validateLogin, validateNewUser };