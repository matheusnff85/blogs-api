const { User } = require('../database/models');
// const Joi = require('joi');

// const loginSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'any.required': '400|Some required fields are missing',
//   }),
//   password: Joi.string().
// });

const validateLogin = async (email, password) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
  const result = await User.findOne({ where: { email } });
  if (!result) return { code: 400, message: 'Invalid fields' };
  return true; 
};

module.exports = { validateLogin };